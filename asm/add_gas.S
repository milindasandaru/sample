.text
.globl add_impl
.type add_impl, @function
add_impl:
    # Arguments: a in %rdi, b in %rsi
    mov %rdi, %rax
    add %rsi, %rax
    ret
