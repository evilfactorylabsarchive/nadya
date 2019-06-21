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

# deploy web to target
echo "> Deploying app with $ENV_TARGET environment..."
now -A ./app/now.json --target $ENV_TARGET --token=$NOW_TOKEN --scope evilfactory

# deploy app to target
echo "> Deploying web with $ENV_TARGET environment..."
now -A ./web/now.json --target $ENV_TARGET --token=$NOW_TOKEN --scope evilfactory

echo "> Done"
