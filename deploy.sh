# check is $NOW_TOKEN exists?
if [[ -z "$NOW_TOKEN" ]]; then
  echo
  echo "> NOW_TOKEN is empty. Deployment cancelled."
  echo
  exit 1
fi

# is this on master branch or something else?
if [[ $TRAVIS_PULL_REQUEST == "false" ]] && [[ $TRAVIS_BRANCH == "master" ]]; then
  ENV_TARGET=production
elif [[ $TRAVIS_BRANCH == "canary" ]]; then
  ENV_TARGET=canary
else
  ENV_TARGET=staging
fi

if [[ -n "$TAVIS_BRANCH" ]]; then
  BRANCH_TYPE=$TRAVIS_BRANCH
else
  BRANCH_TYPE=canary
fi

if [[ -n "$TRAVIS_COMMIT_RANGE" ]]; then
  COMMIT_RANGE=$TRAVIS_COMMIT_RANGE
else
  COMMIT_RANGE="FETCH_HEAD $(git merge-base FETCH_HEAD canary)"
fi

if [[ $TRAVIS_BRANCH == "master" ]]; then
  APP_VER=$TRAVIS_TAG
else
  APP_VER=git rev-parse --short HEAD
fi

CHANGES=$(git --no-pager diff --name-only $COMMIT_RANGE)

deploy_web() {
  # deploy web to target environment
  echo "> Deploying web with $ENV_TARGET environment..."
  cd ./web && now --target $ENV_TARGET --token=$NOW_TOKEN --scope evilfactory -e APP_VER="$APP_VER"
  cd ..
  WEB_URL=$(curl "https://api.zeit.co/v4/now/deployments?teamId=$TEAM_ID&projectId=$PROJECT_WEB_ID" -H "Authorization: Bearer $NOW_TOKEN" | jq -r '.deployments[0].url')
  # comment to PR
  curl -s -H "Authorization: token $GH_TOKEN" \
    -X POST -d '{"body": "Current deployment URL: https://'$WEB_URL'"}' \
    "https://api.github.com/repos/evilfactorylabs/nadya/issues/$TRAVIS_PULL_REQUEST/comments"
}

deploy_app() {
  if [[ $ENV_TARGET == "canary" ]]; then
    NOW_FILE_NAME=now.canary.json
  else
    NOW_FILE_NAME=now.json
  fi
  # override ENV_TARGET since now doesn't realize canary env
  if [[ $TRAVIS_PULL_REQUEST == "false" ]]; then
    ENV_TARGET=production
    else
    ENV_TARGET=staging
  fi
  # deploy app to target environment
  echo "> Deploying app with $ENV_TARGET environment..."
  cd app && now --target $ENV_TARGET --token=$NOW_TOKEN --scope evilfactory -A $NOW_FILE_NAME
  cd ..
  APP_URL=$(curl "https://api.zeit.co/v4/now/deployments?teamId=$TEAM_ID&projectId=$PROJECT_APP_ID" -H "Authorization: Bearer $NOW_TOKEN" | jq -r '.deployments[0].url')
  # comment to PR
  curl -s -H "Authorization: token $GH_TOKEN" \
    -X POST -d '{"body": "Current deployment URL: https://'$APP_URL'"}' \
    "https://api.github.com/repos/evilfactorylabs/nadya/issues/$TRAVIS_PULL_REQUEST/comments"
}

[ -n "$(grep '^web' <<< "$CHANGES")" ] && deploy_web
[ -n "$(grep '^app' <<< "$CHANGES")" ] && deploy_app

echo "> Done"
