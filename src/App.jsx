import React, { useState, useEffect } from 'react';
import { 
  Layout, Input, Button, List, Card, Avatar, Typography, 
  Slider, Space, Popover, Badge, message, Row, Col, Divider 
} from 'antd';
import { 
  PlayCircleOutlined, PauseOutlined, StepBackwardOutlined, 
  StepForwardOutlined, HeartOutlined, PlusOutlined, 
  SearchOutlined, DeleteOutlined, UserOutlined 
} from '@ant-design/icons';
import './App.less';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

// 模拟音乐数据
const mockSongs = [
  { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: 203, liked: false },
  { id: 2, title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: 215, liked: true },
  { id: 3, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 223, liked: false },
  { id: 4, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', album: 'F*CK LOVE 3', duration: 141, liked: true },
  { id: 5, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', duration: 178, liked: false },
  { id: 6, title: 'Montero', artist: 'Lil Nas X', album: 'Montero', duration: 137, liked: true },
  { id: 7, title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', duration: 198, liked: false },
  { id: 8, title: 'Kiss Me More', artist: 'Doja Cat ft. SZA', album: 'Planet Her', duration: 208, liked: true },
];

// 模拟播放列表
const mockPlaylists = [
  { id: 1, name: '我的最爱', songs: [2, 4, 6, 8] },
  { id: 2, name: '工作专注', songs: [1, 3, 5] },
  { id: 3, name: '健身歌单', songs: [7, 1, 4] },
];

const App = () => {
  const [songs] = useState(mockSongs);
  const [playlists, setPlaylists] = useState(mockPlaylists);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // 过滤歌曲
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 播放/暂停切换
  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    } else if (filteredSongs.length > 0) {
      setCurrentSong(filteredSongs[0]);
      setIsPlaying(true);
    }
  };

  // 播放特定歌曲
  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  // 添加到播放列表
  const addToPlaylist = (songId, playlistId) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId && !playlist.songs.includes(songId)) {
        return { ...playlist, songs: [...playlist.songs, songId] };
      }
      return playlist;
    }));
    message.success('已添加到播放列表');
  };

  // 创建新播放列表
  const createPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = {
        id: Date.now(),
        name: newPlaylistName,
        songs: []
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      message.success('播放列表已创建');
    }
  };

  // 从播放列表移除歌曲
  const removeFromPlaylist = (songId) => {
    if (!selectedPlaylist) return;
    
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === selectedPlaylist.id) {
        return { 
          ...playlist, 
          songs: playlist.songs.filter(id => id !== songId) 
        };
      }
      return playlist;
    }));
  };

  // 切换歌曲喜欢状态
  const toggleLike = (songId) => {
    const updatedSongs = songs.map(song => 
      song.id === songId ? { ...song, liked: !song.liked } : song
    );
    message.info(songs.find(s => s.id === songId).liked ? '已取消喜欢' : '已添加到喜欢');
  };

  // 格式化时间 (秒 -> mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // 模拟音频播放
  useEffect(() => {
    if (!currentSong) return;

    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 200) {
            const currentIndex = songs.findIndex(s => s.id === currentSong.id);
            const nextIndex = (currentIndex + 1) % songs.length;
            setCurrentSong(songs[nextIndex]);
            setCurrentTime(0);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentSong, songs]);

  // 获取播放列表中的歌曲
  const getPlaylistSongs = () => {
    if (!selectedPlaylist) return [];
    return selectedPlaylist.songs.map(songId => 
      songs.find(song => song.id === songId)
    ).filter(Boolean);
  };

  return (
    <Layout className="music-player">
      <Sider width={240} className="sidebar">
        <div className="logo">MusicStream</div>
        
        <div className="user-section">
          <Avatar size={64} icon={<UserOutlined />} className="user-avatar" />
          <Text className="username">欢迎回来</Text>
        </div>
        
        <Divider className="divider" />
        
        <div className="playlists-section">
          <Title level={4} className="section-title">播放列表</Title>
          <List
            dataSource={playlists}
            renderItem={playlist => (
              <List.Item 
                className={`playlist-item ${selectedPlaylist?.id === playlist.id ? 'active' : ''}`}
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <Text ellipsis>{playlist.name}</Text>
                <Badge count={playlist.songs.length} className="playlist-badge" />
              </List.Item>
            )}
          />
        </div>
        
        <div className="new-playlist">
          <Input 
            placeholder="新建播放列表"
            value={newPlaylistName}
            onChange={e => setNewPlaylistName(e.target.value)}
            suffix={
              <Button 
                type="text" 
                icon={<PlusOutlined />} 
                onClick={createPlaylist}
                disabled={!newPlaylistName.trim()}
                className="add-playlist-btn"
              />
            }
            className="playlist-input"
          />
        </div>
      </Sider>
      
      <Layout className="main-layout">
        <Header className="header">
          <div className={`search-bar ${isSearchFocused ? 'search-bar-focused' : ''}`}>
            <Search
              placeholder="搜索歌曲、艺人或专辑"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="search-input"
              allowClear
            />
          </div>
        </Header>
        
        <Content className="content">
          {selectedPlaylist ? (
            <div className="playlist-view">
              <div className="playlist-header">
                <Title level={2} className="playlist-title">{selectedPlaylist.name}</Title>
                <Text type="secondary" className="song-count">{getPlaylistSongs().length} 首歌曲</Text>
              </div>
              
              <List
                dataSource={getPlaylistSongs()}
                renderItem={song => (
                  <List.Item className="song-item">
                    <div className="song-info">
                      <Avatar 
                        shape="square"
                        size={48}
                        src={`https://weavefox.alipay.com/api/bolt/unsplash_image?keyword=${song.album}&width=60&height=60&random=${song.album}_60_60`}
                        className="song-avatar"
                      />
                      <div className="song-details">
                        <Text strong className="song-title">{song.title}</Text>
                        <Text type="secondary" className="song-artist">{song.artist}</Text>
                      </div>
                    </div>
                    <div className="song-actions">
                      <Text type="secondary" className="song-duration">{formatTime(song.duration)}</Text>
                      <Button 
                        type="text" 
                        icon={<DeleteOutlined />} 
                        onClick={() => removeFromPlaylist(song.id)}
                        className="remove-btn"
                      />
                    </div>
                  </List.Item>
                )}
                className="song-list"
              />
            </div>
          ) : (
            <div className="browse-view">
              <Title level={2} className="browse-title">浏览所有歌曲</Title>
              <Row gutter={[24, 24]} className="song-grid">
                {filteredSongs.map(song => (
                  <Col xs={24} sm={12} md={8} lg={6} xl={4} key={song.id}>
                    <Card
                      hoverable
                      className="song-card"
                      cover={
                        <div className="album-cover">
                          <img
                            alt={song.album}
                            src={`https://weavefox.alipay.com/api/bolt/unsplash_image?keyword=${song.album}&width=200&height=200&random=${song.album}_200_200`}
                            className="album-image"
                          />
                          <Button 
                            shape="circle" 
                            icon={currentSong?.id === song.id && isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />} 
                            className="play-button"
                            onClick={() => playSong(song)}
                          />
                        </div>
                      }
                    >
                      <Card.Meta
                        title={<div className="card-title">{song.title}</div>}
                        description={<div className="card-artist">{song.artist}</div>}
                      />
                      <div className="card-actions">
                        <Button 
                          type="text" 
                          icon={<HeartOutlined />} 
                          className={`like-btn ${song.liked ? 'liked' : ''}`}
                          onClick={() => toggleLike(song.id)}
                        />
                        <Popover
                          placement="bottomRight"
                          content={
                            <div className="playlist-popover">
                              <Text strong className="popover-title">添加到播放列表</Text>
                              <List
                                dataSource={playlists}
                                renderItem={playlist => (
                                  <List.Item 
                                    className="popover-item"
                                    onClick={() => addToPlaylist(song.id, playlist.id)}
                                  >
                                    {playlist.name}
                                  </List.Item>
                                )}
                                className="popover-list"
                              />
                            </div>
                          }
                          trigger="click"
                        >
                          <Button type="text" icon={<PlusOutlined />} className="add-btn" />
                        </Popover>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Content>
        
        <Footer className="player-footer">
          <div className="now-playing">
            {currentSong ? (
              <div className="current-song">
                <Avatar 
                  shape="square"
                  size={56}
                  src={`https://weavefox.alipay.com/api/bolt/unsplash_image?keyword=${currentSong.album}&width=56&height=56&random=${currentSong.album}_56_56`}
                  className="current-avatar"
                />
                <div className="song-info">
                  <Text strong className="current-title">{currentSong.title}</Text>
                  <Text type="secondary" className="current-artist">{currentSong.artist}</Text>
                </div>
                <Button 
                  type="text" 
                  icon={<HeartOutlined />} 
                  className={`current-like ${currentSong.liked ? 'liked' : ''}`}
                  onClick={() => toggleLike(currentSong.id)}
                />
              </div>
            ) : (
              <Text type="secondary" className="no-playing">未播放</Text>
            )}
          </div>
          
          <div className="player-controls">
            <Space align="center" className="control-buttons">
              <Button type="text" icon={<StepBackwardOutlined />} className="control-btn" />
              <Button 
                type="primary" 
                shape="circle" 
                icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />} 
                size="large"
                onClick={togglePlay}
                className="play-btn"
              />
              <Button type="text" icon={<StepForwardOutlined />} className="control-btn" />
            </Space>
            
            <div className="progress-container">
              <Text className="time current-time">{formatTime(currentTime)}</Text>
              <Slider 
                min={0}
                max={currentSong?.duration || 200}
                value={currentTime}
                onChange={value => setCurrentTime(value)}
                className="progress-slider"
              />
              <Text className="time total-time">{currentSong ? formatTime(currentSong.duration) : '0:00'}</Text>
            </div>
          </div>
          
          <div className="volume-control">
            <Slider 
              min={0}
              max={100}
              value={volume}
              onChange={value => setVolume(value)}
              className="volume-slider"
            />
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App; // 添加默认导出语句修复错误
