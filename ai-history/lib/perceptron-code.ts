export const PYTHON_CODE = `"""Part 1: deterministic binary perceptron. Python 3.10+, no packages.
Run: python3 perceptron.py. Learning rate 1, zero start, fixed row order.
This is a teaching classifier, not a reconstruction of the 1958 apparatus.
"""
DATA = [((0, 0), 0), ((0, 1), 0), ((1, 0), 0), ((1, 1), 1)]


def predict(inputs, weights, bias):
    if len(inputs) != 2 or any(x not in (0, 1) for x in inputs):
        raise ValueError("Use two binary inputs.")
    score = weights[0] * inputs[0] + weights[1] * inputs[1] + bias
    return int(score >= 0)


def train(data, rate=1, max_epochs=100):
    if not data or rate <= 0 or max_epochs < 1:
        raise ValueError("Use data, a positive rate, and an epoch limit.")
    weights, bias = [0, 0], 0
    history = []
    for epoch in range(1, max_epochs + 1):
        mistakes = 0
        for inputs, label in data:
            if label not in (0, 1):
                raise ValueError("Use binary labels.")
            prediction = predict(inputs, weights, bias)
            error = label - prediction
            mistakes += int(error != 0)
            for i in range(2):
                weights[i] = weights[i] + rate * error * inputs[i]
            bias = bias + rate * error
        outputs = [predict(x, weights, bias) for x, _ in data]
        history.append((epoch, mistakes, weights.copy(), bias, outputs))
        if all(output == label for output, (_, label) in zip(outputs, data)):
            return weights, bias, history, True
    return weights, bias, history, False


if __name__ == "__main__":
    weights, bias, history, converged = train(DATA)
    for row in history:
        print(row)
    assert converged
    assert [predict(x, weights, bias) for x, _ in DATA] == [0, 0, 0, 1]
    print("Final parameters:", weights, bias)
    for inputs, label in DATA:
        print(inputs, "prediction =", predict(inputs, weights, bias), "label =", label)
    xor = [(x, int(x[0] != x[1])) for x, _ in DATA]
    assert train(xor, max_epochs=20)[3] is False
    print("All checks passed; XOR reached the epoch cap.")
`;
