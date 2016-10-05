export enum VodServices {
    genre = 0,
    program,
    season,
    episode
}
export enum ApiControllers {
    GenreController = VodServices.genre,
    ProgramController = VodServices.program,
    SeasonController = VodServices.season,
    EpisodeController = VodServices.episode
}
export enum ImageTypes {
    Avatar,
    Small,
    Standart,
    Medium,
    Big
}
export enum HeadlineItemTypes {
    Big = 10,
    Video = 1,  // temporary replaced by standard item in views
    Main = 2,
    Ad = 8,
    Pair = 9,
    Small = 0,
    Alert = 6
}
