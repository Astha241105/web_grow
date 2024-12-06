import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticipantProfile } from '../../components/store/slices/participantprofile';
import './badges.css';

const Badges = () => {
  const dispatch = useDispatch();

  const { profile, isLoading, error } = useSelector((state) => state.participant);

  useEffect(() => {
    dispatch(fetchParticipantProfile());
  }, [dispatch]);

  // Function to determine badges earned based on coins
  const renderBadges = (coins) => {
    const badges = [];
    if (coins >= 100) badges.push(<img src="/badge1.svg" alt="Badge 1" key="badge1" />);
    if (coins >= 250) badges.push(<img src="/badge2.svg" alt="Badge 2" key="badge2" />);
    if (coins >= 500) badges.push(<img src="/badge3.svg" alt="Badge 3" key="badge3" />);
    return badges;
  };

  // Calculate progress percentage for coin loader
  const progress = Math.min((profile?.coins || 0) / 500 * 100, 100); // Cap at 100%

  // Calculate how many coins are needed for the next badge
  const calculateCoinsAway = (coins, nextBadgeThreshold) => {
    return nextBadgeThreshold - coins > 0 ? nextBadgeThreshold - coins : 0;
  };

  // Next badge thresholds
  const badgeThresholds = [100, 250, 500];

  // Get coins and next badge progress
  const currentCoins = profile?.coins || 0;
  const nextBadgeThreshold = badgeThresholds.find((threshold) => threshold > currentCoins);
  const coinsAway = nextBadgeThreshold ? calculateCoinsAway(currentCoins, nextBadgeThreshold) : 0;

  return (
    <div id="part-profile-coins-and-badges">
      <div id="part-profile-coins">Coins</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div id="coins-info">
            <img src="/coins.svg" alt="Coins" />
            <div style={{fontSize:"20px",fontWeight:"500"}}>Total coins</div>
          
          </div>
          <div id="coin-loader">
            <div id="coin-progress-bar">
              <div
                id="coin-progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div style={{fontSize:"16px",fontWeight:"600"}}>{currentCoins} / 500</div>
          </div>
          {/* Coins Away Statement */}
          <div id="coins-away-statement">
            {nextBadgeThreshold && coinsAway > 0
              ? `You are ${coinsAway} coins away from the next badge!`
              : `You have unlocked all badges!`}
          </div>
          <div id="part-profile-badges">
            <div>Badges</div>
            <div id="badge-container">
              {renderBadges(currentCoins)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Badges;
