# Shared code in FE and BE

A web app to demonstrate strategies for using the _same_ code inside a Typescript front end and a C# back end.

## How to run
You need to build all the "middle ends" first, then the front end and finally the back end.

### Rust middle end
1. Install Rust: https://www.rust-lang.org/tools/install
2. Install wasm-pack: `cargo install wasm-pack`
3. Run the [build script](middle/rust/build.sh): `cd middle/rust && ./build.sh`

### React front end
`cd front && npm start`

### C# back end
In Visual Studio or Rider, launch the `Morphologue.MiddleEndPreso` configuration.
