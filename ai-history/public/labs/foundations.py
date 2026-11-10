"""Original Part 1 examples. Python 3.10+, standard library only.

Run: python3 foundations.py
Synthetic inputs, no dataset or random seed. Expected final tape: 010.
The machine model is simplified to a finite binary tape and a blank boundary.
No claim about biological neurons, general intelligence, or real compression.
"""
from math import isclose, isfinite, log2


def trace_tape(bits):
    if not isinstance(bits, str) or any(bit not in "01" for bit in bits):
        raise ValueError("Use a finite string of binary digits.")
    tape, head, steps = list(bits), 0, 0
    yield steps, "".join(tape), head, "scan"
    while head < len(tape):
        tape[head] = "0" if tape[head] == "1" else "1"
        head += 1
        steps += 1
        yield steps, "".join(tape), head, "scan"
    yield steps + 1, "".join(tape), head, "halt"


def unit(x1, x2, threshold):
    if x1 not in (0, 1) or x2 not in (0, 1):
        raise ValueError("Inputs must be binary.")
    return int(x1 + x2 >= threshold)


def entropy(probabilities):
    if not probabilities or any(not isfinite(p) or not 0 <= p <= 1 for p in probabilities):
        raise ValueError("Use finite probabilities in [0, 1].")
    if not isclose(sum(probabilities), 1.0, abs_tol=1e-12):
        raise ValueError("Probabilities must sum to 1.")
    return -sum(p * log2(p) for p in probabilities if p > 0)


if __name__ == "__main__":
    trace = list(trace_tape("101"))
    assert trace == [(0, "101", 0, "scan"), (1, "001", 1, "scan"),
                     (2, "011", 2, "scan"), (3, "010", 3, "scan"),
                     (4, "010", 3, "halt")]
    assert list(trace_tape(""))[-1] == (1, "", 0, "halt")
    pairs = [(0, 0), (0, 1), (1, 0), (1, 1)]
    assert [unit(*x, 2) for x in pairs] == [0, 0, 0, 1]
    assert [unit(*x, 1) for x in pairs] == [0, 1, 1, 1]
    assert entropy([1, 0]) == 0
    assert entropy([0.5, 0.5]) == 1
    assert entropy([0.25] * 4) == 2
    assert isclose(entropy([0.75, 0.25]), 0.8112781244591328)
    print("Tape trace:", trace)
    print("AND:", [unit(*x, 2) for x in pairs])
    print("OR:", [unit(*x, 1) for x in pairs])
    print("Biased coin entropy:", entropy([0.75, 0.25]))
    print("All example checks passed.")
