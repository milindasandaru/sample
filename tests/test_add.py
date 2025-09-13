import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from interpreter import run

def test_add():
    # input 'A' (65) and 'C' (67) -> sum 132 -> char(132) (non-printable), but we can test numeric behavior via tape:
    # Instead, test a simpler add: 1 and 2 => 3. We'll craft BF that sets cell0=1, cell1=2 then runs add and outputs cell0 as char '3'.
    code = "++>+++<[->+<]>."  # sets 2 and 3, adds -> result 5 -> prints chr(5)
    out = run(code)
    assert len(out) == 1
    assert ord(out[0]) == 5
