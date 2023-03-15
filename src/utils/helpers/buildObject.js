const buildObject = (result) => result.map((talker) => ({
        name: talker.name,
        age: talker.age,
        id: talker.id,
        talk: {
            watchedAt: talker.talk_watched_at,
            rate: talker.talk_rate,
        },
    }));

module.exports = buildObject;