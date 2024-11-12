import React from 'react';

const HomeBackground = () => {
  const triggers = Array.from({ length: 400 }, (_, i) => (
    <div className="trigger" key={i} />
  ));

  const vrLayers = Array.from({ length: 20 }, (_, i) => (
    <div className="vr_layer" key={i}>
      <div className="vr_layer_item" />
    </div>
  ));

  return (
    <div className="container">
      {triggers}
      <div className="monitor">
        <div className="camera o-x">
          <div className="camera o-y">
            <div className="camera o-z">
              <div className="vr">
                {vrLayers}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBackground;
