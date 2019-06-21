# check is $NOW_TOKEN exists?
if [[ -z "$NOW_TOKEN" ]]; then
  echo
  echo "> NOW_TOKEN is empty. Deployment cancelled."
  echo
  exit 1
fi

# is this on master branch or something else?
if [[ $TRAVIS_BRANCH == 'master' ]]; then
  ENV_TARGET=production
else
  ENV_TARGET=staging
fi

CHANGES=$(git --no-pager diff --name-only FETCH_HEAD $(git merge-base FETCH_HEAD master))

if [[ -n "$(grep '^web') <<< "$CHANGES")" ]]; then
  # deploy web to target
  echo "> Deploying app with $ENV_TARGET environment..."
  cd ./web && now --target $ENV_TARGET --token=$NOW_TOKEN --scope evilfactory
  cd ..
fi

if [[ -n "$(grep '^app') <<< "$CHANGES")" ]]; then
  # deploy app to target
  echo "> Deploying web with $ENV_TARGET environment..."
  cd app && now --target $ENV_TARGET --token=$NOW_TOKEN --scope evilfactory
  cd ..
fi

echo "> Done"
