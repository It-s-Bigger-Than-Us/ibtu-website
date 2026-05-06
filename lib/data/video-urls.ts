/* ═══════════════════════════════════════
   VIDEO CDN URLS — all videos served from Sanity CDN
   Mapped from local filename convention to CDN URLs
   Source: Sanity fileAsset query (107 videos)
═══════════════════════════════════════ */

const S = 'https://cdn.sanity.io/files/0m4ngfcw/production'

/* ── HOMEPAGE HERO ── */
export const HERO_VIDEOS = {
  veniceEnergy: `${S}/c5d5bf284dac6ced80c941be78f8fe6bc9528837.mp4`,
  brentwoodCrop: `${S}/4cad285fb9f61916400af9131497127b893c3869.mp4`,
  schoolAction: `${S}/6274a6f418bc58fe1c14842382b75537e19a8901.mp4`,
  veniceVert: `${S}/41a7d1afb5e6972ee1e2715c050499c5fd5d520a.mp4`,
  heroSchool: `${S}/6274a6f418bc58fe1c14842382b75537e19a8901.mp4`,
}

/* ── PILLAR VIDEOS ── */
export const PILLAR_VIDEOS = {
  crisis: {
    rebuildTeaser: `${S}/11766d2d08f1b4432161d737c33f3c13b06e2472.mp4`,
    altadena: `${S}/cb4a68115366e3a14828982ecaaa58c8cb9791cd.mp4`,
    day3Energy: `${S}/97e2b899b63970e35fcaa971f30cd9b939885456.mp4`,
    altaVert: `${S}/24bbf958ba39d87bbe3c2220075d35d062411a7e.mp4`,
    day3Vert: `${S}/65a3bc3cb255ee507497e423933d6f11f721d2f3.mp4`,
  },
  youth: {
    baldwinHills: `${S}/9e936b3a6b643893cd92df98745cb0715a2f79b5.mp4`,
    wrightSchool: `${S}/84d5a9b64d5c31a2234a43255cbe751e4d5bbd06.mp4`,
    brentwood: `${S}/137f5ebc467ad194a25265291b0a41a1886fc213.mp4`,
    boysVert: `${S}/33a0858e3e954fd10d8da9f1e9cc47109a38c394.mp4`,
    wrightVert: `${S}/7bc7e16676a31290e0bec2fc0afa94ad763acc81.mp4`,
  },
  health: {
    beach1: `${S}/d71703883d6705a633bdf4a9bf997d570728b504.mp4`,
    beach2: `${S}/23c40bdec1430d598fc994a72e394783e0a7fe1f.mp4`,
    community: `${S}/db3201069eae552c60b3c541163e883b075047d4.mp4`,
    beachVert: `${S}/927d8fd83cd02c7feeac8c220d7ea0c9af2ceb1f.mp4`,
    communityVert: `${S}/7677413e6655f1e9b3187e347fac59466fc260b9.mp4`,
  },
}

/* ── PROGRAM VIDEOS ── */
export const PROGRAM_VIDEOS = {
  'fire-relief': {
    highlight: `${S}/d42a83e709c2125c695b9e4f46c854bf5711e49d.mp4`,
    rebuild: `${S}/e706fc10c128276884228a72abf10bf17fa8162f.mp4`,
    altaCrop: `${S}/cb4a68115366e3a14828982ecaaa58c8cb9791cd.mp4`,
    day3Vert: `${S}/de4d291812a7b1c0514cf7d893548d72e49c5b9b.mp4`,
    teaserVert: `${S}/49bfe469a78ec84c575feaf57d05255e29386a40.mp4`,
    hubLaunch: `${S}/c0cd917f12276bc6c936eee1ddacc0b7ea3ea8d2.mp4`,
  },
  'back-to-school': {
    venice1: `${S}/9aa5e50c4810f6e7db0f6fe89ca40a497cc57d8e.mp4`,
    venice2: `${S}/6ed3563aca6d0f3a79cc15c2919975b0c67f480e.mp4`,
    veniceCrop: `${S}/a752bfdd7c1590d1fd4e38f5f9490d9fbcc98c01.mp4`,
    teaserVert: `${S}/c49dddac3344ada98ffae3d5b978ab268ab0baca.mp4`,
    veniceVert: `${S}/b6ccab6e8188aafb80365dd4ca6ba38a863f5819.mp4`,
  },
  'youth-programming': {
    bhes: `${S}/9d20c89e38b80b1c5f28f3e6681392c9eded6dfd.mp4`,
    stmarys: `${S}/7745e6e250abff46ad94e21e933eff1ee2135bee.mp4`,
    wright: `${S}/a6b7333c8ab057d0c17b76d4c74e70872e560b49.mp4`,
    brentwoodVert: `${S}/5646929f3c72c14947024874d3f00192cbe0b1e9.mp4`,
    wrightVert: `${S}/7bc7e16676a31290e0bec2fc0afa94ad763acc81.mp4`,
  },
  'coastal-care': {
    cleanup1: `${S}/de313bfd20252323826f975aea49ff18fb9796a4.mp4`,
    cleanup2: `${S}/06be4bb65bd26f29cd50bfc4018ce9f9cae28151.mp4`,
    crop: `${S}/44a3ff58d088e0ae7c0bad0ba4398df78734f2c9.mp4`,
    vert1: `${S}/3acabd3879d8f54369b42e21129b7252bdbc2cde.mp4`,
    vert2: `${S}/240bc2e61b209ee28f44c33f869b487cabe1e9b5.mp4`,
  },
  'community-health': {
    mlkParade: `${S}/97b2390db5b764943d77c5ae7cddf7dd53b5bbb0.mp4`,
    ramsEvent: `${S}/ce55540477a4b4b706b84bd0f224f5cb3b485e60.mp4`,
    mlkCrop: `${S}/db3201069eae552c60b3c541163e883b075047d4.mp4`,
    mlkVert: `${S}/00b5e9e62093ba362e55042869b3a1c03ed8a4e5.mp4`,
    ramsVert: `${S}/7677413e6655f1e9b3187e347fac59466fc260b9.mp4`,
  },
  'giving-season': {
    cd8Event: `${S}/cbb8628a285c750d47c277d4139cb96b0ac4fbed.mp4`,
    production1: `${S}/761aa02d51ced9c6f2a6137db28236b309f27fc4.mp4`,
    production2: `${S}/9115535358fca56e0be5d1e9e28c8d7f3d0c5623.mp4`,
    cd8Vert: `${S}/a4079562e4ab6f8121ca7c0b9079c1214bfbb8e1.mp4`,
    cd8Vert2: `${S}/132b891a443526deacfbbab0d268be8870816ff0.mp4`,
  },
  'wellness': {
    yogaBeach1: `${S}/23e24a5e5d474c434bc729c187ae5521d62b2379.mp4`,
    yogaBeach2: `${S}/8d5adc7c1920b82da42e91d35c7b85b0c167d830.mp4`,
    beachCrop: `${S}/5e04fad8865f20effef525ec4c10328cd35e222f.mp4`,
    beachVert1: `${S}/11263bd6e5624dab2a457f7953176209cc925e62.mp4`,
    beachVert2: `${S}/927d8fd83cd02c7feeac8c220d7ea0c9af2ceb1f.mp4`,
  },
}

/* ── VOLUNTEER VIDEOS ── */
export const VOLUNTEER_VIDEOS = {
  brentwoodTeam: `${S}/684fe3e70c7e0053e73620f4042a6eb533792d03.mp4`,
  day3Smiles: `${S}/d6e6771d0b18fa735998a58d1006fbdc82aa1357.mp4`,
  rebuildTeam: `${S}/a5e1f8275c5f29d64a3115cde22515ab824e5170.mp4`,
  day3Vert: `${S}/cdbdab3acded6cfb128f1b1e9fb7a5325574b324.mp4`,
  rebuildVert: `${S}/cdbdab3acded6cfb128f1b1e9fb7a5325574b324.mp4`,
}

/* ── Quick lookup: program slug → primary hover video ── */
export const PROGRAM_HOVER_VIDEO: Record<string, string> = {
  'fire-relief': PROGRAM_VIDEOS['fire-relief'].highlight,
  'youth-programming': PROGRAM_VIDEOS['youth-programming'].bhes,
  'back-to-school': PROGRAM_VIDEOS['back-to-school'].venice1,
  'back-2-school': PROGRAM_VIDEOS['back-to-school'].venice1,
  'coastal-care': PROGRAM_VIDEOS['coastal-care'].cleanup1,
  'community-health': PROGRAM_VIDEOS['community-health'].mlkParade,
  'giving-season': PROGRAM_VIDEOS['giving-season'].cd8Event,
  'wellness': PROGRAM_VIDEOS['wellness'].yogaBeach1,
}

/* ── Quick lookup: program slug → all landscape videos for sticky story ── */
export const PROGRAM_STORY_VIDEOS: Record<string, string[]> = {
  'fire-relief': [PROGRAM_VIDEOS['fire-relief'].highlight, PROGRAM_VIDEOS['fire-relief'].rebuild],
  'youth-programming': [PROGRAM_VIDEOS['youth-programming'].bhes, PROGRAM_VIDEOS['youth-programming'].wright, PROGRAM_VIDEOS['youth-programming'].stmarys],
  'back-to-school': [PROGRAM_VIDEOS['back-to-school'].venice1, PROGRAM_VIDEOS['back-to-school'].venice2],
  'back-2-school': [PROGRAM_VIDEOS['back-to-school'].venice1, PROGRAM_VIDEOS['back-to-school'].venice2],
  'coastal-care': [PROGRAM_VIDEOS['coastal-care'].cleanup1, PROGRAM_VIDEOS['coastal-care'].cleanup2, PROGRAM_VIDEOS['coastal-care'].crop],
  'community-health': [PROGRAM_VIDEOS['community-health'].mlkParade, PROGRAM_VIDEOS['community-health'].mlkCrop],
  'giving-season': [PROGRAM_VIDEOS['giving-season'].cd8Event, PROGRAM_VIDEOS['giving-season'].production1, PROGRAM_VIDEOS['giving-season'].production2],
  'wellness': [PROGRAM_VIDEOS['wellness'].yogaBeach1, PROGRAM_VIDEOS['wellness'].yogaBeach2, PROGRAM_VIDEOS['wellness'].beachCrop],
}
