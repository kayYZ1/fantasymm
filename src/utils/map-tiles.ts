const tileSvgs: { [key: string]: string } = {
  deepOcean: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#003366" d="M0 0h16v16H0z"/>
      <path fill="#004080" d="M2 2h12v12H2z"/>
    </svg>`,
  shallowWater: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#006699" d="M0 0h16v16H0z"/>
      <path fill="#0080CC" d="M2 2h12v12H2z"/>
    </svg>`,
  coast: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#0080CC" d="M0 0h16v16H0z"/>
      <path fill="#D3D3D3" d="M0 12h4v4H0z"/>
      <path fill="#BEBEBE" d="M4 12h4v4H4z"/>
      <path fill="#AAAAAA" d="M8 12h4v4H8z"/>
      <path fill="#999999" d="M12 12h4v4H12z"/>
    </svg>`,
  lushGrass: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#388E3C" d="M0 0h16v16H0z"/>
      <path fill="#4CAF50" d="M2 2h12v12H2z"/>
      <path fill="#66BB6A" d="M4 4h8v8H4z"/>
    </svg>`,
  dryGrass: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#A97D31" d="M0 0h16v16H0z"/>
      <path fill="#BDB76B" d="M2 2h12v12H2z"/>
      <path fill="#EEE8AA" d="M4 4h8v8H4z"/>
    </svg>`,
  grassWithFlowers: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#388E3C" d="M0 0h16v16H0z"/>
      <path fill="#4CAF50" d="M2 2h12v12H2z"/>
      <circle cx="4" cy="4" r="1" fill="#FF0000"/>
      <circle cx="12" cy="12" r="1" fill="#FFFF00"/>
      <circle cx="8" cy="8" r="1" fill="#FF69B4"/>
    </svg>`,
  dirt: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#795548" d="M0 0h16v16H0z"/>
      <path fill="#A1887F" d="M2 2h12v12H2z"/>
      <path fill="#BCAAA4" d="M4 4h8v8H4z"/>
    </svg>`,
  stone: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#9E9E9E" d="M0 0h16v16H0z"/>
      <path fill="#B0BEC5" d="M2 2h12v12H2z"/>
      <path fill="#D1D8DC" d="M4 4h8v8H4z"/>
    </svg>`,
  sand: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#F0E68C" d="M0 0h16v16H0z"/>
      <path fill="#F5F5DC" d="M2 2h12v12H2z"/>
      <path fill="#FFF5EE" d="M4 4h8v8H4z"/>
    </svg>`,
  lowMountain: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#8B4513" d="M0 8h4v8H0z"/>
      <path fill="#A0522D" d="M4 4h4v12H4z"/>
      <path fill="#B8860B" d="M8 0h4v16H8z"/>
      <path fill="#D3D3D3" d="M12 8h4v8H12z"/>
    </svg>`,
  highMountain: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#663300" d="M0 12h4v4H0z"/>
      <path fill="#8B4513" d="M4 8h4v8H4z"/>
      <path fill="#A0522D" d="M8 4h4v12H8z"/>
      <path fill="#B8860B" d="M12 0h4v16H12z"/>
    </svg>`,
  coniferousForest: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#228B22" d="M0 0h16v16H0z"/>
      <path fill="#2E8B57" d="M2 2h12v12H2z"/>
      <path fill="#347C17" d="M4 4h8v8H4z"/>
      <path fill="#FFFFFF" d="M7 2h2v2H7z"/>
      <path fill="#FFFFFF" d="M6 5h4v2H6z"/>
      <path fill="#FFFFFF" d="M5 8h6v2H5z"/>
    </svg>`,
  deciduousForest: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#228B22" d="M0 0h16v16H0z"/>
      <path fill="#2E8B57" d="M2 2h12v12H2z"/>
      <path fill="#8B4513" d="M6 6h4v4H6z"/>
      <circle cx="8" cy="4" r="2" fill="#FFD700"/>
      <circle cx="12" cy="8" r="2" fill="#FF4500"/>
      <circle cx="4" cy="12" r="2" fill="#228B22"/>
    </svg>`,
  mixedForest: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#228B22" d="M0 0h16v16H0z"/>
      <path fill="#2E8B57" d="M2 2h12v12H2z"/>
      <path fill="#347C17" d="M4 4h8v8H4z"/>
      <path fill="#FFFFFF" d="M7 2h2v2H7z"/>
      <path fill="#FFFFFF" d="M6 5h4v2H6z"/>
      <path fill="#8B4513" d="M10 10h4v4H10z"/>
      <circle cx="4" cy="4" r="2" fill="#FFD700"/>
      <circle cx="12" cy="12" r="2" fill="#FF4500"/>
    </svg>`,
  path: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#D3D3D3" d="M0 6h16v4H0z"/>
      <path fill="#BEBEBE" d="M2 6h3v4H2z"/>
      <path fill="#BEBEBE" d="M11 6h3v4H11z"/>
    </svg>`,
  bridge: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path fill="#A0522D" d="M0 5h16v6H0z"/>
      <path fill="#D3D3D3" d="M2 5h2v6H2z"/>
      <path fill="#D3D3D3" d="M6 5h2v6H6z"/>
      <path fill="#D3D3D3" d="M10 5h2v6H10z"/>
      <path fill="#D3D3D3" d="M14 5h2v6H14z"/>
    </svg>`,
}

export default tileSvgs
