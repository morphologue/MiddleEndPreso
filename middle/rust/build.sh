#!/usr/bin/env bash
set -e

# Build native binary
cargo build

# Build WASM binary
wasm-pack build --target web
