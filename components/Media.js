import media1 from "../public/Images/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_.jpg";
import media2 from "../public/Images/Spider-Man-No-Way-Home-poster.jpg";
import media3 from "../public/Images/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_FMjpg_UX1000_.jpg"
import media4 from "../public/Images/99f8702093bd74454c4636a33f558c4a.png"
import media5 from "../public/Images/Green-Book-2018.jpg"

export const media = [media1, media2,media3,media4,media5];
export const mediaByIndex = index => media[index % media.length];