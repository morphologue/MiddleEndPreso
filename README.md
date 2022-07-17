# Share code between FE and BE

A web app to demonstrate how the _same_ code can be used inside a Typescript front end and a C# back end.

## How to run
You need to build all the "middle ends" first. Currently there is just the one Rust middle end, however it would be
simple to add other middle ends in order to evaluate e.g.:

* Clojure (via ClojureScript and ClojureCLR)
* Typescript (via ClearScript or similar)
* C# (via WASM)

After building the middle ends, build the front and back ends.

### Rust middle end
1. Install Rust: https://www.rust-lang.org/tools/install
2. Install wasm-pack: `cargo install wasm-pack`
3. Run the [build script](middle/rust/build.sh): `cd middle/rust && ./build.sh`

### React front end
```
cd front && npm start
```

A symlink will be created to the `middle` directory.

### C# back end
In Visual Studio or Rider, launch the `Morphologue.MiddleEndPreso` configuration.

A `CopyFiles` task will copy the compiled Rust dylib into the build output.
