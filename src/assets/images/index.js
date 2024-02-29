export const getBossImage = (boss) => {
    if (boss.chance === 0 && !boss.wip) {
        return boss.dead_image;
    } else {
        return boss.image;
    }
}