#include <stdint.h>
#include "add.h"

#ifdef ADD_USE_ASM
// When assembly is enabled, use the external implementation.
extern long long add_impl(long long a, long long b);
long long add(long long a, long long b) {
    return add_impl(a, b);
}
#else
// Fallback pure C implementation when assembly isn't available (e.g., non-x86_64).
long long add(long long a, long long b) {
    return a + b;
}
#endif
