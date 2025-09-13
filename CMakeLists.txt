cmake_minimum_required(VERSION 3.15)
project(first-app LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Enable assembly language depending on platform/toolchain
set(ASM_SRC)
# Only enable x86_64 assembly on x86_64/AMD64 architectures
if (CMAKE_SYSTEM_PROCESSOR MATCHES "(x86_64|X86_64|amd64|AMD64)")
  if (MSVC)
    enable_language(ASM_MASM)
    list(APPEND ASM_SRC asm/add_win64.asm)
  else()
    enable_language(ASM)
    list(APPEND ASM_SRC asm/add_gas.S)
  endif()
endif()

add_executable(first-app
  src/main.cpp
  src/add.c
  ${ASM_SRC}
)

target_include_directories(first-app PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/include)

# Warnings
if (MSVC)
  target_compile_options(first-app PRIVATE /W4)
else()
  target_compile_options(first-app PRIVATE -Wall -Wextra -Wpedantic)
endif()

# Define when assembly is used
if (ASM_SRC)
  target_compile_definitions(first-app PRIVATE ADD_USE_ASM=1)
endif()

# Build test harness (after project and toolchain are known)
add_executable(add-test src/test.cpp src/add.c ${ASM_SRC})
target_include_directories(add-test PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/include)
if (MSVC)
  target_compile_options(add-test PRIVATE /W4)
else()
  target_compile_options(add-test PRIVATE -Wall -Wextra -Wpedantic)
endif()
if (ASM_SRC)
  target_compile_definitions(add-test PRIVATE ADD_USE_ASM=1)
endif()

# CTest integration
enable_testing()
add_test(NAME add_test COMMAND add-test)
