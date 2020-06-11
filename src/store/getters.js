export default {
    GStu(state) {
        return state.students.filter(a => a.age > 20)
    }
}