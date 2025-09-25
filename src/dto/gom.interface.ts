export interface simpleGameInfo {
    startDtm: Date,
    mmrBefore: number,
    mmrGain: number,
    mmrAfter: number
}

export interface crawlData {
    text: string | undefined,
    firstLink: string | undefined;
}