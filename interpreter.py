#!/usr/bin/env python3
# Minimal brainfuck interpreter
import sys

def run(code, inp=""):
    tape = [0] * 30000
    ptr = 0
    pc = 0
    input_idx = 0
    output = []
    # Precompute matching bracket pairs
    stack = []
    match = {}
    for i, c in enumerate(code):
        if c == '[':
            stack.append(i)
        elif c == ']':
            if not stack:
                raise SyntaxError("Unmatched ']' at position {}".format(i))
            j = stack.pop()
            match[i] = j
            match[j] = i
    if stack:
        raise SyntaxError("Unmatched '[' at positions: {}".format(stack))

    while pc < len(code):
        c = code[pc]
        if c == '>':
            ptr += 1
            if ptr >= len(tape):
                tape.append(0)
        elif c == '<':
            ptr = max(0, ptr - 1)
        elif c == '+':
            tape[ptr] = (tape[ptr] + 1) % 256
        elif c == '-':
            tape[ptr] = (tape[ptr] - 1) % 256
        elif c == '.':
            output.append(chr(tape[ptr]))
        elif c == ',':
            if input_idx < len(inp):
                tape[ptr] = ord(inp[input_idx]) % 256
                input_idx += 1
            else:
                tape[ptr] = 0
        elif c == '[':
            if tape[ptr] == 0:
                pc = match[pc]
        elif c == ']':
            if tape[ptr] != 0:
                pc = match[pc]
        pc += 1
    return ''.join(output)

def main():
    import argparse
    p = argparse.ArgumentParser(description="Simple Brainfuck interpreter")
    p.add_argument("file", help="Path to .bf file")
    p.add_argument("-i", "--input", help="Input string (for , commands)", default="")
    args = p.parse_args()

    with open(args.file, "r", encoding="utf-8") as f:
        code = ''.join(ch for ch in f.read() if ch in "<>+-.,[]")
    out = run(code, inp=args.input)
    sys.stdout.write(out)

if __name__ == "__main__":
    main()
