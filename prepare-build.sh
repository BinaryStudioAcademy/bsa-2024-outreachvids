#!/bin/bash
mkdir -p ./build/backend; mv ./backend/build/* ./build/backend
mkdir ./build/backend/public; mv ./frontend/build/* ./build/backend/public
cp ./backend/package.json ./build/backend
cp package.json package-lock.json ./build
