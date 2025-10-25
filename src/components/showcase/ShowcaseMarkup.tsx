import React from 'react';
import { bloggersData } from './data';
import { ShowcaseRefs } from './types';
import CinematicTransition from './CinematicTransition';

interface ShowcaseMarkupProps {
  refs: ShowcaseRefs;
}

export const ShowcaseMarkup: React.FC<ShowcaseMarkupProps> = ({ refs }) => {
  return (
    <div className="creative-showcase">
      {/* Loading Overlay */}
      <div
        ref={refs.loadingOverlayRef}
        className="loading-overlay"
        id="loading-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          fontSize: '1.5rem',
          fontFamily: 'var(--font-primary)',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em'
        }}
      >
        Loading <span className="loading-counter" ref={refs.loadingCounterRef}>[00]</span>
      </div>

      {/* Debug Info */}
      <div ref={refs.debugInfoRef} className="debug-info"></div>

      {/* Scroll Container */}
      <div className="scroll-container" style={{ position: 'relative', backgroundColor: '#fff' }}>
        
        {/* Fixed Section - cria o espaço de scroll */}
        <div className="fixed-section" style={{ height: `${(bloggersData.length + 2) * 100}vh`, position: 'relative', backgroundColor: '#fff' }}>
          
          {/* Fixed Container - fica pinado */}
          <div
            ref={refs.fixedContainerRef}
            className="fixed-container"
            style={{
              position: 'sticky',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
              willChange: 'transform, height',
              transformOrigin: 'top center',
              backgroundColor: '#fff'
            }}
          >
            {/* Background Container */}
            <div className="background-container" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              overflow: 'hidden',
              backgroundColor: '#000'
            }}>
              {/* Background Images */}
              {bloggersData.map((blogger, index) => (
                <div
                  key={blogger.id}
                  className={`background-image ${index === 0 ? 'active' : ''}`}
                  style={{
                    position: 'absolute',
                    top: '-10%',
                    left: 0,
                    width: '100%',
                    height: '120%',
                    backgroundImage: `url(${blogger.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: index === 0 ? 1 : 0,
                    filter: 'brightness(0.8)',
                    willChange: 'transform',
                    transformOrigin: 'center center',
                    zIndex: index === 0 ? 2 : 0
                  }}
                />
              ))}
            </div>

            {/* Grid Container */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '1rem',
              padding: '0 2rem',
              height: '100%',
              position: 'relative',
              zIndex: 100
            }}>
              
              {/* Header */}
              <div ref={refs.headerRef} className="header" style={{
                gridColumn: '1 / 13',
                alignSelf: 'start',
                paddingTop: '5vh',
                fontSize: '10vw',
                lineHeight: 0.8,
                textAlign: 'center',
                color: '#ffffff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                willChange: 'transform, filter, opacity',
                zIndex: 150,
                position: 'relative'
              }}>
                <div className="header-row">SALVADOR</div>
                <div className="header-row">BLOGGERS</div>
              </div>

              {/* Content */}
              <div
                ref={refs.contentRef}
                className="content"
                style={{
                  gridColumn: '1 / 13',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  transform: 'translateY(-50%)',
                  padding: '0 2rem',
                  willChange: 'transform',
                  zIndex: 150,
                  pointerEvents: 'none'
                }}
              >
                {/* Left Column */}
                <div ref={refs.leftColumnRef} className="left-column" style={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  textAlign: 'left',
                  willChange: 'filter, opacity',
                  transition: 'filter 0.5s ease, opacity 0.5s ease',
                  zIndex: 600,
                  pointerEvents: 'auto'
                }}>
                  {bloggersData.map((blogger, index) => (
                    <div
                      key={blogger.id}
                      className={`artist ${index === 0 ? 'active loaded' : 'loaded'}`}
                      style={{
                        opacity: index === 0 ? 1 : 0.3,
                        transform: 'translateY(0)',
                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        color: '#ffffff',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
                        cursor: 'pointer',
                        position: 'relative',
                        paddingLeft: index === 0 ? '15px' : '0',
                        zIndex: 300,
                        fontSize: '1.2rem',
                        pointerEvents: 'auto',
                        fontWeight: '500',
                        fontFamily: 'var(--font-primary, "PP Neue Montreal", sans-serif)'
                      }}
                    >
                      {index === 0 && (
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '4px',
                          height: '4px',
                          backgroundColor: '#ffffff',
                          borderRadius: '50%'
                        }} />
                      )}
                      {blogger.name}
                    </div>
                  ))}
                </div>

                {/* Featured */}
                <div ref={refs.featuredRef} className="featured" style={{
                  width: '20%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontSize: '1.5vw',
                  position: 'relative',
                  height: '10vh',
                  overflow: 'hidden',
                  willChange: 'filter, opacity',
                  transition: 'filter 0.5s ease, opacity 0.5s ease',
                  pointerEvents: 'none',
                  zIndex: 100
                }}>
                  {bloggersData.map((blogger, index) => (
                    <div
                      key={blogger.id}
                      className={`featured-content ${index === 0 ? 'active' : ''}`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: index === 0 ? 1 : 0,
                        visibility: index === 0 ? 'visible' : 'hidden'
                      }}
                    >
                      <h3 style={{
                        whiteSpace: 'nowrap',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        margin: 0,
                        fontWeight: 500,
                        color: 'rgba(245, 245, 245, 0.9)'
                      }}>
                        {blogger.featured}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div ref={refs.rightColumnRef} className="right-column" style={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  textAlign: 'right',
                  willChange: 'filter, opacity',
                  transition: 'filter 0.5s ease, opacity 0.5s ease',
                  zIndex: 600,
                  pointerEvents: 'auto'
                }}>
                  {bloggersData.map((blogger, index) => (
                    <div
                      key={blogger.id}
                      className={`category ${index === 0 ? 'active loaded' : 'loaded'}`}
                      style={{
                        opacity: index === 0 ? 1 : 0.3,
                        transform: 'translateY(0)',
                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        color: '#ffffff',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
                        cursor: 'pointer',
                        position: 'relative',
                        paddingRight: index === 0 ? '15px' : '0',
                        zIndex: 300,
                        fontSize: '1.2rem',
                        pointerEvents: 'auto',
                        fontWeight: '500',
                        fontFamily: 'var(--font-primary, "PP Neue Montreal", sans-serif)'
                      }}
                    >
                      {index === 0 && (
                        <div style={{
                          position: 'absolute',
                          right: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '4px',
                          height: '4px',
                          backgroundColor: '#ffffff',
                          borderRadius: '50%'
                        }} />
                      )}
                      {blogger.category}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div ref={refs.footerRef} className="footer" style={{
                gridColumn: '1 / 13',
                alignSelf: 'end',
                paddingBottom: '5vh',
                fontSize: '10vw',
                lineHeight: 0.8,
                textAlign: 'center',
                color: '#ffffff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                willChange: 'transform, filter, opacity',
                transition: 'filter 0.5s ease, opacity 0.5s ease',
                zIndex: 150,
                position: 'relative'
              }}>
                <div className="header-row">STYLE</div>
                <div className="header-row">ICONS</div>
                
                {/* Progress Indicator */}
                <div style={{
                  width: '160px',
                  height: '1px',
                  margin: '2vh auto 0',
                  position: 'relative',
                  backgroundColor: 'rgba(245, 245, 245, 0.3)'
                }}>
                  <div
                    ref={refs.progressFillRef}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '0%',
                      backgroundColor: 'rgba(245, 245, 245, 0.9)',
                      transition: 'width 0.3s cubic-bezier(0.65, 0, 0.35, 1)'
                    }}
                  />
                  
                  {/* Progress Numbers */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.7rem',
                    color: 'rgba(245, 245, 245, 0.9)',
                    fontFamily: 'var(--font-primary)',
                    letterSpacing: '-0.02em',
                    transform: 'translateY(-50%)',
                    margin: '0 -25px'
                  }}>
                    <span ref={refs.currentSectionRef}>01</span> / {String(bloggersData.length).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End Section */}
        <div className="end-section" style={{
          fontSize: '2rem',
          height: '100vh',
          position: 'relative',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <CinematicTransition />
        </div>
      </div>
    </div>
  );
};