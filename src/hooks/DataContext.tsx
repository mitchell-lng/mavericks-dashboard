import React, { createContext, useState, useContext, useEffect } from 'react';

import type { FullPlayerData, FullPlayerDataFieldInfoType, DataFieldMinimum } from '../utils/types';
import { FullPlayerDataFieldInfo } from '../utils/fieldData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

// Deep copy and filter only the specified keys
const allowedKeys = ['seasonLog', 'scoutRanking', 'measurements', 'playerBio'];

const leaderboardFields = Object.fromEntries(
  Object.entries(FullPlayerDataFieldInfo)
    .filter(([key]) => allowedKeys.includes(key))
    .map(([key, value]) => [
      key,
      {
      ...value,
      fields: Object.fromEntries(
        Object.entries(value.fields).filter(
        ([, subfield]) => (subfield as any).type === 'number'
        )
      ),
      },
    ])
  );

const initialData = {
  bookmarks: [],
  players: [],
  leaderboardFields: leaderboardFields,
};

interface DataContextType {
  data: {
    bookmarks?: FullPlayerData[];
    players?: FullPlayerData[];
    leaderboardFields?: FullPlayerDataFieldInfoType;
  };

  resetData: () => void;
  addToast: (message: string, type: 'success' | 'error') => void;
  addBookmark: (playerData: FullPlayerData) => void;
  removeBookmark: (playerId: number) => void;
  setPlayers: (players: FullPlayerData[]) => void;
  removePlayer: (playerId: number) => void;
  addPlayer: (playerData: FullPlayerData) => void;
  toggleLeaderboardField: (fieldData: DataFieldMinimum) => void;
  updatePlayerData: (playerData: FullPlayerData) => void;
}

const DataContext = createContext<DataContextType>({ 
  data: initialData, 
  resetData: () => {},
  addToast: () => void 0,
  addBookmark: () => void 0,
  removeBookmark: () => void 0,
  setPlayers: () => void 0,
  addPlayer: () => void 0,
  removePlayer: () => void 0,
  toggleLeaderboardField: () => void 0,
  updatePlayerData: () => void 0,
});

export const DataProvider = ({ children } : { children: React.ReactNode }) => {
  const [data, setData] = useState<DataContextType['data']>(initialData);

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

  const toggleLeaderboardField = (fieldData: DataFieldMinimum) => {
    setData((prevData) => {
      const parent = fieldData.parent;
      const field = fieldData.field;
      const parentField = prevData.leaderboardFields?.[parent];
      if (!parentField || !parentField.fields || !parentField.fields[field]) {
        return prevData;
      }
      return {
        ...prevData,
        leaderboardFields: {
          ...prevData.leaderboardFields,
          [parent]: {
            ...parentField,
            label: parentField.label ?? '',
            description: parentField.description ?? '',
            checked: parentField.checked ?? false,
            reverse: parentField.reverse ?? false,
            type: parentField.type,
            fields: {
              ...parentField.fields,
              [field]: {
                ...parentField.fields[field],
                checked: !parentField.fields[field].checked,
              },
            },
          },
        },
      };
    });
  };

  const updatePlayerData = (playerData: FullPlayerData) => {
    setData((prevData) => ({
      ...prevData,
      players: prevData.players?.map((player) =>
        player.playerBio.playerId === playerData.playerBio.playerId ? playerData : player
      ),
    }));

    if (data.bookmarks && data.bookmarks.some((bookmark) => bookmark.playerBio.playerId === playerData.playerBio.playerId)) {
      setData((prevData) => ({
        ...prevData,
        bookmarks: prevData.bookmarks?.map((bookmark) =>
          bookmark.playerBio.playerId === playerData.playerBio.playerId ? playerData : bookmark
        ),
      }));
    }

    addToast('Player data updated successfully', 'success');
  };

  return (
    <DataContext.Provider value={{ data, updatePlayerData, resetData, setPlayers, removePlayer, addBookmark, removeBookmark, addPlayer, addToast, toggleLeaderboardField }}>
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