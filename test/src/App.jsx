import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Typography, Card } from 'antd';
import { PlayCircleOutlined, PauseOutlined, ReloadOutlined } from '@ant-design/icons';
import './App.less';

const { Title, Text } = Typography;

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

const App = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef(null);

  // 生成随机食物位置
  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    
    // 确保食物不出现在蛇身上
    const isOnSnake = snake.some(segment => 
      segment.x === newFood.x && segment.y === newFood.y
    );
    
    if (isOnSnake) {
      return generateFood();
    }
    
    return newFood;
  };

  // 初始化游戏
  const initGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection(DIRECTIONS.RIGHT);
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  // 处理键盘输入
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== DIRECTIONS.DOWN) setDirection(DIRECTIONS.UP);
          break;
        case 'ArrowDown':
          if (direction !== DIRECTIONS.UP) setDirection(DIRECTIONS.DOWN);
          break;
        case 'ArrowLeft':
          if (direction !== DIRECTIONS.RIGHT) setDirection(DIRECTIONS.LEFT);
          break;
        case 'ArrowRight':
          if (direction !== DIRECTIONS.LEFT) setDirection(DIRECTIONS.RIGHT);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, direction]);

  // 游戏主循环
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        // 检查碰撞
        if (
          head.x < 0 || 
          head.x >= GRID_SIZE || 
          head.y < 0 || 
          head.y >= GRID_SIZE ||
          prevSnake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];
        
        // 检查是否吃到食物
        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood());
          setScore(prev => prev + 10);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED - (score / 2));
    return () => clearInterval(gameLoopRef.current);
  }, [isPlaying, gameOver, direction, food, score]);

  // 绘制游戏
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制食物
    ctx.fillStyle = '#ff4d4f';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    
    // 绘制蛇
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#52c41a' : '#73d13d';
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      
      // 绘制蛇身边框
      ctx.strokeStyle = '#237804';
      ctx.strokeRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
    
    // 绘制网格
    ctx.strokeStyle = '#f0f0f0';
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        ctx.strokeRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }, [snake, food]);

  return (
    <div className="game-container">
      <Card className="game-card">
        <Space direction="vertical" size="large" align="center">
          <Title level={2} className="game-title">贪吃蛇游戏</Title>
          
          <Space className="game-info">
            <Text strong>分数: {score}</Text>
            <Text type={gameOver ? "danger" : "success"}>
              {gameOver ? "游戏结束!" : isPlaying ? "游戏中..." : "准备开始"}
            </Text>
          </Space>
          
          <div className="canvas-container">
            <canvas 
              ref={canvasRef} 
              width={GRID_SIZE * CELL_SIZE} 
              height={GRID_SIZE * CELL_SIZE}
              className="game-canvas"
            />
          </div>
          
          <Space className="game-controls">
            {!isPlaying ? (
              <Button 
                type="primary" 
                icon={<PlayCircleOutlined />}
                onClick={initGame}
              >
                {gameOver ? "重新开始" : "开始游戏"}
              </Button>
            ) : (
              <Button 
                icon={<PauseOutlined />}
                onClick={() => setIsPlaying(false)}
              >
                暂停
              </Button>
            )}
            
            <Button 
              icon={<ReloadOutlined />}
              onClick={initGame}
            >
              重置
            </Button>
          </Space>
          
          <div className="game-instructions">
            <Text type="secondary">使用方向键控制蛇的移动</Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default App;
