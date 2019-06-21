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
else
  ENV_TARGET=staging
fi

CHANGES=$(git --no-pager diff --name-only $TRAVIS_COMMIT_RANGE)

deploy_web() {
  # deploy web to target environment
  echo "> Deploying app with $ENV_TARGET environment..."
  cd ./web && now --target $ENV_TARGET --token=$NOW_TOKEN --scope evilfactory
  cd ..
  WEB_URL=$(curl "https://api.zeit.co/v4/now/deployments?teamId=$TEAM_ID&projectId=$PROJECT_WEB_ID" -H "Authorization: Bearer $NOW_TOKEN" | jq -r '.deployments[0].url')
  # comment to PR
  curl -s -H "Authorization: token $GH_TOKEN" \
    -X POST -d '{"body": "Current deployment URL: https://'$WEB_URL'"}' \
    "https://api.github.com/repos/evilfactorylabs/nadya/issues/$TRAVIS_PULL_REQUEST/comments"
}

deploy_app() {
  # deploy app to target environment
  echo "> Deploying web with $ENV_TARGET environment..."
  cd app && now --target $ENV_TARGET --token=$NOW_TOKEN --scope evilfactory
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
