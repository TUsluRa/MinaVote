
declare global {
    interface Window { mina: any; } 
  }
  
  export async function checkProvider(): Promise<boolean> {
    if (!window.mina) {
      alert('No provider was found. Please install Auro Wallet.');
      return false;
    }
    return true;
  }
  
  export async function requestAccounts(): Promise<string[]> {
    if (!(await checkProvider())) {
      throw new Error('No provider was found. Please install Auro Wallet.');
    }
  
    try {
      const accounts = await window.mina.requestAccounts();
      return accounts;
    } catch (error) {
      throw error;
    }
  }