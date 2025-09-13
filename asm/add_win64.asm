; Windows x64 MASM implementation of long long add_impl(long long a, long long b)

OPTION DOTNAME
OPTION CASEMAP:none

.code
add_impl PROC
    ; Windows x64: RCX = a, RDX = b, return in RAX
    mov     rax, rcx
    add     rax, rdx
    ret
add_impl ENDP

END
