function dummy(blogs) {
    return 1;
}

function totalLikes(blogsArr){

    let sum = blogsArr.reduce((a,b) => a + b.likes, 0)

    return sum;

}

module.exports = {dummy, totalLikes};