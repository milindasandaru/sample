## How to test

### Automated test (CTest)
After building, run:

**Windows (PowerShell):**
```powershell
cd build
ctest
```

**Linux/macOS (bash/zsh):**
```bash
cd build
ctest
```

### Manual test
You can also run the test harness directly:

**Windows:**
```powershell
./build/Release/add-test.exe
```

**Linux/macOS:**
```bash
./build/add-test
```

Expected output:
Test passed: add(123, 456) == 579

# My First Repository — Simple C/C++/Assembly App

Welcome! This is my first GitHub repository, now featuring a minimal cross-platform console app built with CMake that mixes C++, C, and x86-64 Assembly.

## What does it do?
- Prints a friendly greeting (optionally with your name)
- Demonstrates calling a C function (`add(a, b)`) implemented in assembly (on x86-64) or pure C (fallback)

## Project Structure
- `src/main.cpp` — C++ entrypoint, prints greeting and calls `add(a, b)`
- `include/add.h` — C header for the add function
- `src/add.c` — C wrapper, calls assembly or C fallback
- `asm/add_gas.S` — x86-64 assembly (GAS/AT&T syntax) for Linux/macOS
- `asm/add_win64.asm` — x86-64 assembly (MASM) for Windows
- `CMakeLists.txt` — CMake build configuration
- `.github/workflows/ci.yml` — GitHub Actions workflow for Windows, Linux, macOS
- `.gitignore` — ignores build artifacts and IDE files

## Build and Run

### Windows (PowerShell)
```powershell
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release
./build/Release/first-app.exe
./build/Release/first-app.exe Milinda
```

### Linux/macOS (bash/zsh)
```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build -j 4
./build/first-app
./build/first-app Milinda
```

## How does the add function work?
- On x86-64, `add(a, b)` is implemented in assembly for performance and demonstration.
- On other architectures, it falls back to a pure C implementation.

## Continuous Integration
Every push and pull request is automatically built and run on Windows, Linux, and macOS using GitHub Actions.

---
This repository is a learning project and a template for mixing C, C++, and Assembly in a modern cross-platform build.

## Build and Run

### Windows (PowerShell)
```powershell
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release
./build/Release/first-app.exe
./build/Release/first-app.exe Milinda
```

### Linux/macOS (bash/zsh)
```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build -j 4
./build/first-app
./build/first-app Milinda
```

## What’s inside
- `CMakeLists.txt` — CMake build configuration
- `src/main.cpp` — Simple C++ program printing a greeting and using `add(a,b)`
- `include/add.h` — C interface for `add`
- `src/add.c` — C wrapper calling platform assembly or C fallback
- `asm/add_gas.S` — GAS (AT&T) assembly for Unix-like x86-64
- `asm/add_win64.asm` — MASM assembly for Windows x86-64
- `.github/workflows/ci.yml` — GitHub Actions workflow to build and run the app on Windows, Linux, and macOS

## Notes
- This is my first repository. I reset the previous content and replaced it with this simple C++ example to keep things clean and easy to learn.

