# n8n-trigger Action

A composite GitHub Action for triggering n8n workflows with built-in health checks and retry logic.

## Usage

```yaml
- name: Trigger N8N
  uses: ./.github/actions/n8n-trigger
  with:
    n8n-base-url: ${{ env.N8N_BASE_URL }}
    n8n-api-key: ${{ env.N8N_API_KEY }}
    payload: ${{ steps.payload.outputs.payload }}
    retries: '3'
    delay-seconds: '5'
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `n8n-base-url` | Base URL of the n8n instance | Yes | - |
| `n8n-api-key` | API key for n8n authentication | Yes | - |
| `payload` | JSON payload to send to the webhook | Yes | - |
| `retries` | Number of retry attempts | No | `3` |
| `delay-seconds` | Delay between retries in seconds | No | `5` |

## Features

- **Health Check**: Performs a health check before triggering the workflow
- **Retry Logic**: Automatically retries failed requests with configurable attempts and delays
- **Secret Masking**: Automatically masks the API key in logs
- **Error Handling**: Provides clear error messages and proper exit codes
- **Webhook Endpoint**: Triggers the `/webhook/deploy` endpoint by default

## Example Payload

The action expects a JSON payload. Example:

```json
{
  "repo": "owner/repo",
  "sha": "abc123...",
  "run_id": "1234567890",
  "branch": "main"
}
```

## Error Handling

- If the health check fails, the action will exit with code 1
- If all retry attempts fail, the action will exit with code 1
- Successful triggers will exit with code 0

## Security

- API keys are automatically masked in logs using `::add-mask::`
- Uses HTTPS for all requests
- Validates the n8n instance health before sending data
