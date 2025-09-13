#pragma once

#ifdef __cplusplus
extern "C" {
#endif

// Adds two 64-bit integers using a platform-specific assembly implementation.
long long add(long long a, long long b);

#ifdef __cplusplus
}
#endif
