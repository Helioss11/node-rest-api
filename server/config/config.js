process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.URLDB = process.env.NODE_ENV === 'dev' ? 
    'mongodb://localhost:27017/cafe' : 
    'mongodb+srv://strider:QtqbpnHVIFlxwzh3@cluster0-vt5i4.mongodb.net/cafe';