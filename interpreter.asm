; Tiny x86-64 Linux assembly: print "Hello from ASM" and exit
; Assemble: nasm -f elf64 interpreter.asm -o interpreter.o
; Link:     ld interpreter.o -o hello_asm

section .data
    msg db "Hello from ASM", 10
    len equ $-msg

section .text
    global _start

_start:
    mov rax, 1      ; sys_write
    mov rdi, 1      ; stdout
    mov rsi, msg    ; buffer
    mov rdx, len    ; length
    syscall

    mov rax, 60     ; sys_exit
    xor rdi, rdi    ; status 0
    syscall