.PHONY: deploy build clean serve

V ?= 1 # When V is 1, print commands and build progress.
Q := $(if $V,,@)

build:
	$Q yarn run build

deploy: build
	$Q aws s3 --endpoint-url https://s3.cfdata.org/ sync --acl public-read build s3://every1dns-landing

# clean up generated files, to allow regeneration
clean:
	$Q rm -rf build

serve: node_modules
	$Q PATH="$$PWD/bin:$$PATH" yarn start

node_modules:
	yarn install
