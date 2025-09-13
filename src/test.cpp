#include <iostream>
#include "add.h"

int main() {
    long long a = 123, b = 456;
    long long result = add(a, b);
    if (result != (a + b)) {
        std::cerr << "Test failed: add(" << a << ", " << b << ") != " << (a + b) << ", got " << result << std::endl;
        return 1;
    }
    std::cout << "Test passed: add(" << a << ", " << b << ") == " << result << std::endl;
    return 0;
}
