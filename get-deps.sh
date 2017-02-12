#!/bin/bash
#
# Download external dependancies to build project

mkdir resources || mkdir resources/lib

PIXI_SOURCE="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.3.2/"
# PIXI_SOURCE="http://pixijs.download/release/"

for pixi in pixi.js pixi.js.map pixi.min.js pixi.min.js.map ;
do
    curl -o "resources/lib/$pixi" "$PIXI_SOURCE/$pixi"
done
