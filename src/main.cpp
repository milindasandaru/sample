#include <iostream>
#include <string>
#include "add.h"

int main(int argc, char** argv) {
    std::string name = argc > 1 ? argv[1] : "World";
    std::cout << "Hello, " << name << "! This is my first repository with a simple C/C++/Assembly app." << std::endl;
    long long a = 40, b = 2;
    std::cout << "add(" << a << ", " << b << ") = " << add(a, b) << std::endl;
    return 0;
}
