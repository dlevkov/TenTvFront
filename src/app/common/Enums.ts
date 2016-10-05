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