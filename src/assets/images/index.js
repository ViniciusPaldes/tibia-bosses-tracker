import { isFullMoonActive } from 'services/date';

import highChanceImage from './high_chance.png';
import lowChanceImage from './low_chance.png';
import mediumChanceImage from './medium_chance.png';
import noChanceImage from './no_chance.png';
import wipImage from './wip.png';

export const getChanceImage = (boss) => {
    if (boss.wip) {
        return wipImage;
    }
    if (isFullMoonActive(boss)) {
        return highChanceImage
    } else {
        const chanceLabel = boss?.chanceLabel;
        switch (chanceLabel) {
            case "Alta":
                return highChanceImage;
            case "Média":
                return mediumChanceImage;
            case "Baixa":
                return lowChanceImage;
            default:
                return noChanceImage;
        }
    }

};

export const getBossImage = (boss) => {
    if (boss.chance === 0 && !boss.wip) {
        return boss.dead_image;
    } else {
        return boss.image;
    }
}