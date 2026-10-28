CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY, name TEXT NOT NULL, note TEXT NOT NULL);
INSERT OR IGNORE INTO places (id,name,note) VALUES (1,'公園','散歩におすすめ'),(2,'図書館','雨の日にも利用できる');
