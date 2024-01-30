from fastapi import FastAPI

app = FastAPI(docs_url='/api/docs', openapi_url='/api/openapi.json')


@app.get('/api/health')
def health_check():
    return {'status': 'success', "message" : "Proxy Server Health Check Successful"}