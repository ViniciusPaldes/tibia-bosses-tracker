const BgLogin = require('./bg_login.jpg');

export const getBossImage = (boss) => {
    if (boss.chance === 0 && !boss.wip) {
        return boss.dead_image;
    } else {
        return boss.image;
    }
}

export default BgLogin;