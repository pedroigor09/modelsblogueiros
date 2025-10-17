export const showcaseStyles = `
  @import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");

  :root {
    --font-primary: "PP Neue Montreal", sans-serif;
    --text-color: rgba(245, 245, 245, 0.9);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .creative-showcase {
    text-transform: uppercase;
    font-family: var(--font-primary);
    background-color: #fff;
    color: #000;
    font-weight: 500;
    letter-spacing: -0.02em;
    overflow-x: hidden;
    width: 100%;
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    color: #000;
    font-size: 1.5rem;
    font-family: var(--font-primary);
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }

  .loading-counter {
    margin-left: 0.5rem;
  }

  .word-mask {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
  }

  .split-word {
    display: inline-block;
    vertical-align: middle;
  }

  .artist,
  .category {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    color: var(--text-color);
    cursor: pointer;
    position: relative;
  }

  .artist {
    padding-left: 0;
  }

  .category {
    padding-right: 0;
  }

  .artist:hover,
  .category:hover {
    opacity: 1 !important;
  }

  .artist.loaded {
    opacity: 0.3;
    transform: translateY(0);
  }

  .category.loaded {
    opacity: 0.3;
    transform: translateY(0);
  }

  .artist.active {
    opacity: 1;
    transform: translateX(10px);
    padding-left: 15px;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .artist.active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background-color: var(--text-color);
    border-radius: 50%;
  }

  .category.active {
    opacity: 1;
    transform: translateX(-10px);
    padding-right: 15px;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .category.active::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background-color: var(--text-color);
    border-radius: 50%;
  }

  .background-image.active {
    opacity: 1;
    z-index: 2;
  }

  .background-image.previous {
    opacity: 1;
    z-index: 1;
  }

  .featured-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
  }

  .featured-content.active {
    opacity: 1;
    visibility: visible;
  }

  .featured-content h3 {
    white-space: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    margin: 0;
    font-weight: 500;
    color: var(--text-color);
  }

  @media (max-width: 768px) {
    .content {
      flex-direction: column;
      gap: 5vh;
    }

    .left-column,
    .right-column,
    .featured {
      width: 100%;
      text-align: center;
    }

    .featured {
      font-size: 3vw;
      order: -1;
      margin-bottom: 2vh;
    }

    .header,
    .footer {
      font-size: 15vw;
    }

    .progress-indicator {
      width: 120px;
    }
  }
`;