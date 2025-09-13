# Tiny Brainfuck, Assembly, and Shell

This repository now focuses on tiny examples in three languages:

- Brainfuck (see `examples/`)
- Assembly (NASM) – `interpreter.asm` prints a short message
- Shell – `hello.sh` prints a short message

No Python or C files are needed anymore.

## Files
- `examples/hello.bf` – Hello World in Brainfuck
- `examples/add.bf`, `examples/echo.bf`, `examples/loop.bf`, `examples/multiply.bf` – small BF samples
- `interpreter.asm` – minimal x86-64 Linux program that prints a message
- `hello.sh` – tiny shell script

## Build/Run
Assembly (Linux/x86-64):
1) nasm -f elf64 interpreter.asm -o interpreter.o
2) ld interpreter.o -o hello_asm
3) ./hello_asm

Shell:
1) sh ./hello.sh

Brainfuck:
Use any BF interpreter to run files in `examples/`.

## Linguist
`.gitattributes` is configured so GitHub recognizes Brainfuck, Assembly, and Shell.
