import React, { createContext, useState, useContext, useEffect } from 'react';

import type { FullPlayerData } from '../utils/types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const initialData = {
  bookmarks: [],
  players: [],
};

interface DataContextType {
  data: {
    bookmarks?: FullPlayerData[];
    players?: FullPlayerData[];
  };
  resetData: () => void;
  addToast: (message: string, type: 'success' | 'error') => void;
  addBookmark: (playerData: FullPlayerData) => void;
  removeBookmark: (playerId: number) => void;
  setPlayers: (players: FullPlayerData[]) => void;
  removePlayer: (playerId: number) => void;
  addPlayer: (playerData: FullPlayerData) => void;
}

const DataContext = createContext<DataContextType>({ 
  data: initialData, 
  resetData: () => {},
  addToast: (message: string, type: 'success' | 'error') => {},
  addBookmark: (playerData: FullPlayerData) => {}, 
  removeBookmark: (playerId: number) => {},
  setPlayers: (players: FullPlayerData[]) => {},
  addPlayer: (playerData: FullPlayerData) => {},
  removePlayer: (playerId: number) => {},
});

export const DataProvider = ({ children } : { children: React.ReactNode }) => {
  const [data, setData] = useState<DataContextType['data']>({});

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    toast.show && setTimeout(() => {
      setToast({ ...toast, show: false });
    }, 3000);
  }
  , [toast]);

  const resetData = () => {
    setData(initialData);
  };

  const addToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
  };

  // Function to add a player
  const addPlayer = (playerData: FullPlayerData) => {
    setData((prevData) => ({
      ...prevData,
      players: [...(prevData.players || []), playerData],
    }));

    addToast('Player added successfully', 'success');
  };

  // Function to set players data
  const setPlayers = (players: FullPlayerData[]) => {
    setData((prevData) => ({
      ...prevData,
      players: players,
    }));
  };

  const removePlayer = (playerId: number) => {
    setData((prevData) => ({
      ...prevData,
      players: prevData.players?.filter((player) => player.playerBio.playerId !== playerId),
    }));

    addToast('Player removed successfully', 'error');
  };

  const addBookmark = (playerData: FullPlayerData) => {
    setData((prevData) => {
      const alreadyBookmarked = prevData.bookmarks?.some(
      (player) => player.playerBio.playerId === playerData.playerBio.playerId
      );
      if (alreadyBookmarked) {
      return prevData;
      }
      return {
      ...prevData,
      bookmarks: [...(prevData.bookmarks || []), playerData],
      };
    });

    addToast('Bookmark added successfully', 'success');
  };

  const removeBookmark = (playerId: number) => {
    setData((prevData) => ({
      ...prevData,
      bookmarks: prevData.bookmarks?.filter((player) => player.playerBio.playerId !== playerId),
    }));
    addToast('Bookmark removed successfully', 'error');
  };

  return (
    <DataContext.Provider value={{ data, resetData, setPlayers, removePlayer, addBookmark, removeBookmark, addPlayer, addToast }}>
      {children}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          <FontAwesomeIcon icon={faBell} />
          <span>{toast.message}</span>
        </div>
      )}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);