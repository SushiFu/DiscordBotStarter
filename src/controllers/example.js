import Example from "../models/example";

function saveExample(example) {
    return Example.create(example);
}

function getExample(example) {
    return Example.get(example);
}

function deleteExample(example) {
    return Example.delete(example);
}

function listExamples() {
    return Example.all();
}

export default { saveExample, getExample, listExamples, deleteExample };
