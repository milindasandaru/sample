import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from interpreter import run
import pathlib

def test_hello():
    code = pathlib.Path("examples/hello.bf").read_text()
    out = run(''.join(ch for ch in code if ch in "<>+-.,[]"))
    assert out.startswith("Hello") or "Hello" in out  # some BF variants print the full phrase
