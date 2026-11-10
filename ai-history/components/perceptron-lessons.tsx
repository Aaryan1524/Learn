import { FigureSlot } from "./figure-slot";
import { GuidedDetail } from "./book-shell";
import { AND_DATA, OR_DATA, XOR_DATA, predict, learn, train } from "@/lib/perceptron";
import { PYTHON_CODE } from "@/lib/perceptron-code";

export function LogicLesson() {
  return <>
    <section id="why-this-idea"><h2>Can a decision become a calculation?</h2>
      <p>A simple alarm should sound only when a system is armed <em>and</em> its door is open. Represent false by 0 and true by 1. We want one precise rule that works for every input pair.</p>
      <p>McCulloch and Pitts’s 1943 paper connected idealized all-or-none neural activity with logical operations. Their formal network uses simplifying assumptions, including discrete timing and special inhibitory behavior. It is a mathematical model, not a full description of living neurons. The weighted unit below is a modern teaching simplification of the connection between threshold decisions and logic.</p>
      <aside className="margin-note"><strong>Representation comes first</strong><p>Here we choose the parameters. In lesson 6, labelled examples will change them.</p></aside>
    </section>
    <section id="the-figure" className="figure-section" aria-label="The mechanism"><FigureSlot id="threshold-unit" primary /></section>
    <section id="worked-example"><h2>Build the score from arithmetic.</h2>
      <p>Call the inputs <code>x₁</code> and <code>x₂</code>. Each is a scalar—a single number—equal to 0 or 1. A weight <code>w₁</code> tells us how much the first feature contributes; <code>w₂</code> does the same for the second. Multiply each input by its own weight, then add the products.</p>
      <FigureSlot id="weighted-inputs" />
      <p>The <strong>bias</strong> <code>b</code> is one more scalar contribution. It is added on every example, even when both inputs are zero. It changes how much evidence is needed to turn the output on.</p>
      <div className="equation" aria-label="z equals w one times x one plus w two times x two plus bias"><code>z = w₁x₁ + w₂x₂ + b</code></div>
      <p>The score <code>z</code> is a real scalar, while the prediction is binary: output 1 if <code>z ≥ 0</code>, otherwise 0. All quantities are dimensionless in this toy model. Equality belongs to the on case; this convention matters at exact zero.</p>
      <p>The older threshold notation says <code>w₁x₁ + w₂x₂ ≥ θ</code>. Subtract <code>θ</code> from both sides to get <code>w₁x₁ + w₂x₂ − θ ≥ 0</code>. Therefore our bias convention is <code>b = −θ</code>. A positive threshold corresponds to a negative bias.</p>
      <GuidedDetail title="Work two examples one operation at a time">
        <p>With inputs (1, 0), weights (2, −1), and bias −0.5, the products are <code>2 × 1 = 2</code> and <code>−1 × 0 = 0</code>. Add them: 2. Add bias: <code>z = 1.5</code>. Since 1.5 is nonnegative, predict 1.</p>
        <p>Keep the same weights and bias but use input (0, 1). The products become 0 and −1, so <code>z = −1.5</code> and the prediction is 0. A negative weight can reduce a score; it is not an error or an invalid parameter.</p>
        <p>Now hold input (1, 0) fixed and change only the bias to −2. The score is exactly 0, so it still predicts 1. Bias −2.1 gives −0.1 and predicts 0. Check both the arithmetic and the stated equality convention.</p>
      </GuidedDetail>
      <FigureSlot id="bias-shift" />
      <h3>Find AND, rather than memorize it.</h3>
      <p>Choose both weights to be 1. To keep a single active input off, require <code>1 + b &lt; 0</code>, hence <code>b &lt; −1</code>. To activate when both inputs are 1, require <code>2 + b ≥ 0</code>, hence <code>b ≥ −2</code>. Both requirements hold when <code>−2 ≤ b &lt; −1</code>. We choose −1.5.</p>
      <p>For OR, both-zero must be off, so <code>b &lt; 0</code>. A single active input must be on, so <code>b ≥ −1</code>. Choose −0.5 from <code>−1 ≤ b &lt; 0</code>.</p>
      <div className="table-scroll"><table><caption>Same weights (1,1); different biases</caption><thead><tr><th>x₁</th><th>x₂</th><th>AND score</th><th>AND output</th><th>OR score</th><th>OR output</th></tr></thead><tbody>{AND_DATA.map(e => { const a = predict({ weights: [1, 1], bias: -1.5 }, e.inputs); const o = predict({ weights: [1, 1], bias: -.5 }, e.inputs); return <tr key={e.inputs.join("")}><td>{e.inputs[0]}</td><td>{e.inputs[1]}</td><td>{a.score}</td><td>{a.prediction}</td><td>{o.score}</td><td>{o.prediction}</td></tr>; })}</tbody></table></div>
      <FigureSlot id="gate-comparison" />
      <h3>Put the logic back into the alarm.</h3>
      <p>Let <code>x₁ = armed</code> and <code>x₂ = door_open</code>. With weights (1,1) and bias −1.5, an open door while unarmed gives <code>z = 0 + 1 − 1.5 = −0.5</code>: no alarm. Armed with the door open gives <code>z = 0.5</code>: alarm. This only illustrates a Boolean rule; a real alarm system needs additional behavior.</p>
      <FigureSlot id="alarm-rule" />
      <h3>One useful limitation: XOR.</h3>
      <p>XOR requires outputs 0, 1, 1, 0 at inputs 00, 01, 10, 11. At 00, predicting 0 requires <code>b &lt; 0</code>. The two single-active inputs require <code>w₁ ≥ −b</code> and <code>w₂ ≥ −b</code>. Adding gives <code>w₁ + w₂ + b ≥ −b &gt; 0</code>, so 11 must turn on, contradicting XOR. Lesson 8 will explain the same conflict geometrically and construct a small hidden-layer solution.</p>
      <FigureSlot id="xor-boundary" />
      <GuidedDetail title="Write the fixed decision in Python" kind="build"><pre><code>{'def neuron(x1, x2, w1, w2, bias):\n    score = w1 * x1 + w2 * x2 + bias\n    return int(score >= 0)\n\nassert neuron(1, 0, 1, 1, -1.5) == 0'}</code></pre><p>The integer conversion maps a true comparison to 1 and a false one to 0. We have implemented prediction, not learning: no example changes a weight yet.</p></GuidedDetail>
    </section>
  </>;
}

export function ExtendedLesson({ id }: { id: "perceptron" | "build-perceptron" | "decision-boundaries" }) {
  if (id === "perceptron") {
    const update = learn({ weights: [0, 0], bias: 0 }, { inputs: [1, 0], label: 0 }, .5);
    return <>
      <section id="why-this-idea"><h2>Can examples choose the parameters?</h2>
        <p>Writing an AND rule is easy when its truth table is already understood. But suppose we only have examples: an input and the class it should belong to. Instead of hand-selecting every parameter, let incorrect predictions change them.</p>
        <p>Rosenblatt’s 1958 paper studied perception, stored associations, and the effect of experience on responses. Its sensory, association, and response systems are richer than our two-input classifier. We use a simplified modern binary perceptron to make mistake-driven learning reproducible, not to reconstruct the original apparatus.</p>
        <aside className="margin-note"><strong>A label is a target</strong><p>A labelled example pairs features with an expected answer. A prediction is the answer the current parameters actually produce.</p></aside>
      </section>
      <section id="the-figure" className="figure-section" aria-label="The mechanism"><FigureSlot id="learning-loop" primary /></section>
      <section id="worked-example"><h2>Turn a mistake into an update.</h2>
        <p>First compute <code>z = w₁x₁ + w₂x₂ + b</code> and predict 1 if <code>z ≥ 0</code>. Call the target label <code>y</code> and the prediction <code>ŷ</code> (read “y hat”). Both are scalar values in {"{0,1}"}. Their difference is the scalar error:</p>
        <div className="equation"><code>e = y − ŷ</code></div>
        <div className="table-scroll"><table><caption>Three possible error signals</caption><thead><tr><th>Situation</th><th>y</th><th>ŷ</th><th>e</th><th>Direction</th></tr></thead><tbody><tr><td>Missed positive</td><td>1</td><td>0</td><td>1</td><td>Increase score on this example</td></tr><tr><td>False alarm</td><td>0</td><td>1</td><td>−1</td><td>Decrease score</td></tr><tr><td>Correct</td><td>same</td><td>same</td><td>0</td><td>No update</td></tr></tbody></table></div>
        <FigureSlot id="error-direction" />
        <p>Let <code>η</code> (eta) be a positive scalar <strong>learning rate</strong>. For each input position <code>i</code>, use its own value <code>xᵢ</code> to change its corresponding weight. Here i is either 1 or 2:</p>
        <div className="equation"><code>wᵢ,new = wᵢ,old + η e xᵢ<br />b,new = b,old + η e</code></div>
        <p>The bias receives the same common factor without an input multiplier. Equivalently it has an extra constant input of 1. If an input is zero, its weight update is zero: changing that weight would not change the score on this example anyway.</p>
        <GuidedDetail title="Calculate a complete mistaken update">
          <p>Begin with weights (0,0), bias 0, input (1,0), and label 0. The score is 0, which predicts 1 under our ≥ rule. Therefore <code>e = 0 − 1 = −1</code>. Choose <code>η = 0.5</code>.</p>
          <ol><li>The common factor is <code>ηe = 0.5 × (−1) = −0.5</code>.</li><li>First increment: <code>Δw₁ = −0.5 × 1 = −0.5</code>.</li><li>Second increment: <code>Δw₂ = −0.5 × 0 = 0</code>.</li><li>Bias increment: <code>Δb = −0.5</code>.</li><li>Add increments to the old values: new weights ({update.next.weights.join(", ")}), new bias {update.next.bias}.</li></ol>
          <p>Recompute rather than assume success: the new score is <code>−0.5 × 1 + 0 × 0 − 0.5 = −1</code>, so the prediction is now 0. New parameter values and increments happen to agree here only because the old values were all zero.</p>
        </GuidedDetail>
        <FigureSlot id="parameter-update" />
        <h3>Why the direction is sensible.</h3>
        <p>For the same input, substitute all updated parameters into the score. Group the old terms together, leaving the change:</p>
        <div className="equation"><code>z,new − z,old = η e (x₁² + x₂² + 1)</code></div>
        <p>The squares appear because each increment <code>ηexᵢ</code> is multiplied by <code>xᵢ</code> again during prediction. The final 1 comes from the bias. The parenthesized scalar is positive, so the sign of the score change follows the error. This improves the direction on this one example; it does not guarantee a correct prediction immediately or improvement on every other example.</p>
        <p>A larger learning rate multiplies the increments. With zero initialization and exact arithmetic, scaling a constant positive rate scales the entire parameter trajectory and leaves binary signs unchanged. It is not universally true that a larger rate trains faster. Different initialization, changing rates, or finite precision can change behavior.</p>
        <h3>One pass is an epoch.</h3>
        <p>Present each example, predict, and update on mistakes. After all examples have been visited once, one epoch is finished. Repeat, because correcting one example can break another. Test the full truth table using the current fixed parameters at the end of each pass.</p>
        <FigureSlot id="training-epochs" />
        <h3>When can training converge?</h3>
        <p>For a finite set of bounded examples that admits a strict linear separator, the classical perceptron with a fixed positive learning rate and repeated presentation of every example makes only finitely many mistakes. We include bias by treating 1 as an extra feature. The teaching run starts from zero parameters. Separability is an assumption about the represented data; contradictory labels or XOR in the original two features violate it.</p>
        <p>The standard argument tracks progress toward a separating direction while bounding how quickly the parameter length can grow. A positive <strong>margin</strong> means the labelled examples stay a nonzero distance from that separator under a specified normalization. Smaller margins can allow more mistakes. Convergence here means correct training labels—not a unique separator or guaranteed accuracy on unseen examples.</p>
        <p className="small">Later mathematical reference: Novikoff’s 1962 symposium contribution lies outside the 1943–1959 era. For an accessible verified statement of the classical result and its assumptions, see <a href="https://cseweb.ucsd.edu/~yfreund/papers/LargeMarginsUsingPerceptron.pdf" target="_blank" rel="noreferrer">Freund & Schapire (1999), §2–3.1</a>. This later source supports the mathematics, not an event placed in 1958.</p>
        <FigureSlot id="margin-condition" />
      </section>
    </>;
  }
  if (id === "build-perceptron") {
    const run = train(AND_DATA);
    return <>
      <section id="why-this-idea"><h2>Make the arithmetic executable.</h2><p>You now know every operation the learner needs. Python will repeat those operations without TensorFlow, PyTorch, a GPU, or an API. The inputs are the four synthetic AND examples; we deliberately evaluate all four because this tiny task has only four possible inputs. This is a truth-table check, not a held-out generalization study.</p><aside className="margin-note"><strong>Reproducible by construction</strong><p>Zero parameters, learning rate 1, and row order 00, 01, 10, 11. There is no random seed because nothing is sampled.</p></aside></section>
      <section id="the-figure" className="figure-section" aria-label="The mechanism"><FigureSlot id="python-prediction" primary /></section>
      <section id="worked-example"><h2>A complete plain-Python learner.</h2>
        <p><a href="/labs/perceptron.py" download>Download perceptron.py</a>, then run <code>python3 perceptron.py</code> with Python 3.10 or newer. It uses only the standard language. The default is capped at 100 epochs; the final assertion verifies every AND prediction.</p>
        <pre><code>{PYTHON_CODE}</code></pre>
        <h3>Read it one operation at a time.</h3>
        <ol className="code-walkthrough">
          <li><code>DATA</code> pairs each tuple of two features with its target label. The order is fixed, which fixes the update trace.</li>
          <li><code>def predict</code> names the prediction function. Its input check rejects pairs other than two binary features.</li>
          <li><code>score = …</code> multiplies feature 0 by weight 0, feature 1 by weight 1, and adds bias. Python starts indexing at 0; the lesson’s x₁ is <code>inputs[0]</code>.</li>
          <li><code>int(score &gt;= 0)</code> converts a true comparison to 1 and a false one to 0. It is the activation rule, including its equality case.</li>
          <li><code>def train</code> accepts the dataset, rate, and stopping cap. The guard rejects missing data or nonpositive settings for this small example.</li>
          <li><code>weights, bias = [0, 0], 0</code> creates the initial parameters. <code>history = []</code> creates a list for observing training.</li>
          <li>The outer <code>range</code> starts at epoch 1 and includes <code>max_epochs</code>. <code>mistakes = 0</code> resets the during-pass counter.</li>
          <li><code>for inputs, label in data</code> visits one labelled example. The label guard limits targets to 0 and 1.</li>
          <li>Compute the prediction, subtract it from the label to obtain error, and count this example if its error is nonzero.</li>
          <li><code>for i in range(2)</code> updates each weight from its own input. These are the two scalar update equations, not matrix operations.</li>
          <li>The separate bias statement adds <code>rate * error</code>. Omitting it would prevent some needed decision offsets.</li>
          <li>After the inner loop, <code>outputs</code> evaluates every example with the final parameters for this epoch.</li>
          <li><code>history.append</code> stores the pass number, mistakes, a <code>copy()</code> of the weights, bias, and outputs. Without a copy, later list mutations would overwrite earlier weight records.</li>
          <li><code>zip(outputs, data)</code> pairs each final prediction with its example. <code>all(…)</code> checks every label, rather than only the last example.</li>
          <li>Return the model, history, and success flag when the table is correct. If the loop reaches its cap, return <code>False</code>; a cap is a practical stop, not a proof of impossibility.</li>
          <li>The <code>__main__</code> block runs only when this file is executed directly. It prints the trace, asserts AND success, tests all four inputs, and checks that the bounded XOR run does not succeed.</li>
        </ol>
        <FigureSlot id="python-training" />
        <h3>Compare your run with this trace.</h3>
        <p>The table below is computed from the same zero-start configuration by the tested TypeScript teaching model. The downloadable Python run is checked against the same expected rows.</p>
        <div className="table-scroll"><table><caption>Learning rate 1; fixed AND order; all evaluations use the end-of-epoch model</caption><thead><tr><th>Epoch</th><th>Mistakes during pass</th><th>Weights</th><th>Bias</th><th>Final predictions</th></tr></thead><tbody>{run.history.map(r => <tr key={r.epoch}><td>{r.epoch}</td><td>{r.mistakes}</td><td>{r.parameters.weights.join(", ")}</td><td>{r.parameters.bias}</td><td>{r.predictions.join(", ")}</td></tr>)}</tbody></table></div>
        <GuidedDetail title="Reproduce the first pass by hand"><p>On 00, zero score predicts 1 although the label is 0: error −1 leaves both weights at 0 and changes bias to −1. On 01 and 10, the score is −1, correctly predicting 0. On 11 the score is still −1 but the target is 1: error +1 changes both weights to 1 and bias to 0. That is two mistakes during the pass. Re-evaluating all four examples at (1,1), bias 0 produces four 1s, so training must continue.</p></GuidedDetail>
        <h3>Test every final prediction.</h3>
        <div className="table-scroll"><table><caption>Final AND parameters: weights ({run.parameters.weights.join(", ")}), bias {run.parameters.bias}</caption><thead><tr><th>Inputs</th><th>Score</th><th>Prediction</th><th>Expected</th></tr></thead><tbody>{AND_DATA.map(e => { const result = predict(run.parameters, e.inputs); return <tr key={e.inputs.join("")}><td>{e.inputs.join(", ")}</td><td>{result.score}</td><td>{result.prediction}</td><td>{e.label}</td></tr>; })}</tbody></table></div>
        <p>The run succeeds after {run.history.length} passes. Its final boundary passes through 11, which is positive under the ≥ convention. Another example order can find different parameters. There is no requirement to recover the hand-chosen (1,1), bias −1.5 solution.</p>
        <FigureSlot id="test-all-inputs" />
        <GuidedDetail title="Change the task and investigate" kind="build"><p>Replace the labels by OR: 0,1,1,1, and run again. Then try XOR: 0,1,1,0. Preserve the epoch cap. Compare the success flag and the full set of predictions; do not infer success from a decrease in one epoch’s mistake count.</p><p>Self-assessed implementation task: hide the listing, write your own predictor and update loop, then test all four cases. Your rubric is: correct threshold including equality, error sign, input-specific increments, bias update, repeated passes, and an explicit stopping result. The supplied download remains a reference solution.</p></GuidedDetail>
      </section>
    </>;
  }
  return <>
    <section id="why-this-idea"><h2>What shape does one decision have?</h2><p>Parameter updates change a score. Geometry helps us see which changes a single perceptron can represent. Put x₁ on the horizontal axis and x₂ on the vertical axis. Each example becomes a point: 00 is (0,0), 01 is (0,1), 10 is (1,0), and 11 is (1,1).</p><p>A model predicts 1 on the side where its score is nonnegative. The points whose score is exactly zero form its <strong>decision boundary</strong>.</p></section>
    <section id="the-figure" className="figure-section" aria-label="The mechanism"><FigureSlot id="linear-boundary" primary /></section>
    <section id="worked-example"><h2>Derive the line instead of guessing it.</h2>
      <div className="equation"><code>w₁x₁ + w₂x₂ + b = 0</code></div>
      <p>Assume <code>w₂ ≠ 0</code>. Subtract <code>w₁x₁</code> and <code>b</code> from both sides, then divide every term by w₂:</p>
      <div className="equation"><code>w₂x₂ = −w₁x₁ − b<br />x₂ = (−w₁ / w₂)x₁ − b / w₂</code></div>
      <p>This is a straight line. Its slope is <code>−w₁/w₂</code>; its vertical intercept is <code>−b/w₂</code>. The weights together determine orientation, while varying bias with fixed nonzero weights moves the line parallel to itself. Bias alone does not rotate it.</p>
      <GuidedDetail title="Work through a boundary and its predictions"><p>Choose weights (2,1) and bias −1. The zero-score equation is <code>2x₁ + x₂ − 1 = 0</code>. Add 1, subtract 2x₁, and obtain <code>x₂ = 1 − 2x₁</code>. The intercept is 1 and the slope is −2.</p><p>At (0,0) the score is −1 and the prediction is 0. At (0,1) the score is 0 and the prediction is 1. At (1,0) the score is 1 and the prediction is 1. Checking the original score avoids accidentally reversing the positive side when dividing an inequality by a negative number.</p><p>Change bias to −2: <code>x₂ = 2 − 2x₁</code>. The slope stays −2; the intercept moves from 1 to 2. Scaling all parameters by the same positive factor preserves the boundary and predictions; a negative factor reverses the two strict sides.</p></GuidedDetail>
      <FigureSlot id="boundary-motion" />
      <h3>Handle the cases division would miss.</h3>
      <p>If w₂ is zero but w₁ is not, solve <code>w₁x₁ + b = 0</code> to obtain a vertical line <code>x₁ = −b/w₁</code>. For weights (1,0), bias −0.5, the boundary is x₁ = 0.5. If both weights are zero, the model predicts a constant from the bias. Bias zero makes every point score zero and predict 1; it does not define a useful separating line.</p>
      <h3>Why XOR cannot fit one line.</h3>
      <div className="table-scroll"><table><caption>XOR labels at the four corners</caption><thead><tr><th>Coordinate (x₁,x₂)</th><th>XOR label</th></tr></thead><tbody>{XOR_DATA.map(e => <tr key={e.inputs.join("")}><td>{e.inputs.join(", ")}</td><td>{e.label}</td></tr>)}</tbody></table></div>
      <p>The two positive corners are opposite one another, as are the two negative corners. Each diagonal has midpoint (0.5,0.5). A linear score at a midpoint is the average of its endpoint scores: expanding the formula verifies this directly. The positive endpoints both require nonnegative scores, so their midpoint score is nonnegative. The negative endpoints both require strictly negative scores, so their same midpoint score is negative. One number cannot satisfy both requirements.</p>
      <GuidedDetail title="Check the same contradiction with inequalities"><p>At 00, XOR requires b &lt; 0. At 10 and 01 it requires w₁ + b ≥ 0 and w₂ + b ≥ 0. Add these: w₁ + w₂ + 2b ≥ 0. Subtract b: the score at 11 is w₁ + w₂ + b ≥ −b &gt; 0. But XOR requires that score to be negative. No choice of the three parameters resolves the contradiction.</p></GuidedDetail>
      <FigureSlot id="xor-points" />
      <h3>A hidden layer changes the representation.</h3>
      <p>Build two hidden threshold units: <code>h₁ = OR(x₁,x₂)</code>, using weights (1,1), bias −0.5; and <code>h₂ = AND(x₁,x₂)</code>, using weights (1,1), bias −1.5. Feed these two binary outputs into a new unit with score <code>h₁ − 2h₂ − 0.5</code>.</p>
      <div className="table-scroll"><table><caption>A hand-constructed hidden-layer XOR network</caption><thead><tr><th>Inputs</th><th>h₁ (OR)</th><th>h₂ (AND)</th><th>Output score</th><th>Prediction</th></tr></thead><tbody>{XOR_DATA.map(e => { const h1 = predict({ weights: [1, 1], bias: -.5 }, e.inputs).prediction; const h2 = predict({ weights: [1, 1], bias: -1.5 }, e.inputs).prediction; const result = predict({ weights: [1, -2], bias: -.5 }, [h1, h2]); return <tr key={e.inputs.join("")}><td>{e.inputs.join(", ")}</td><td>{h1}</td><td>{h2}</td><td>{result.score}</td><td>{result.prediction}</td></tr>; })}</tbody></table></div>
      <p>The hidden threshold operations are nonlinear transformations of the original features. The output is linear in h₁ and h₂, but the whole computation is not one linear threshold in x₁ and x₂. We have constructed a representation; we have not shown how to learn hidden-layer weights. That separate problem motivates later eras.</p>
      <FigureSlot id="hidden-layer-xor" />
      <GuidedDetail title="Investigate the limitation with the Python trainer" kind="build"><p>Run the bounded trainer on XOR and inspect its final predictions. Failure after 20 epochs alone would not prove nonseparability; the argument above does. Then replace the features by the fixed hidden outputs and train only the output unit. This changes the representation as well as the data seen by the learner.</p></GuidedDetail>
    </section>
  </>;
}
