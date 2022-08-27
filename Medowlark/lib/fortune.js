var fortunes = [
    'I asked God for a bike, but I know God doesn’t work that way. So I stole a bike and asked for forgiveness.',
    'I don’t suffer from insanity, I enjoy every minute of it.',
    'A train station is where the train stops. A bus station is where the bus stops. On my desk, I have a work station…',
    'Alcohol does not solve any problems, but then again, neither does milk.',
    'I am nobody. Nobody is perfect. I am perfect.'
];

exports.getFortune = () => {
    var idx = Math.floor(Math.random() * fortunes.length);
    return fortunes[idx];
};