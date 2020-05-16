declare module "screeps-api" {
  interface MeResponse {
    ok: any;
    _id: any;
    email: string;
    username: string;
    cpu: number;
    badge: {
      type: number;
      color1: string;
      color2: string;
      color3: string;
      param: number;
      flip: boolean;
    };
    password: string;
    notifyPrefs: {
      sendOnline: any;
      errorsInterval: any;
      disabledOnMessages: any;
      disabled: any;
      interval: any;
    };
    gcl: number;
    credits: number;
    lastChargeTime: any;
    lastTweetTime: any;
    github: { id: any; username: any };
    twitter: { username: string; followers_count: number };
  }

  interface Game {
    // // placeSpawn(placement: [string, number, number][], name: string): void
    // // PlaceSpawn(placement: (string | number)[], name: string): void
    placeSpawn(
      roomName: string,
      x: number,
      y: number,
      name: string,
      shard?: string
    ): void;
  }

  interface Branch {
    branch: string;
    activeWorld: boolean;
  }

  interface User {
    badge(...args: any): any;
    cloneBranch(...args: any): any;
    branches(...args: any): { list: Branch[] };
    setActiveBranch(...args: any): any;
    worldStatus(...args: any): any;
  }

  interface Auth {
    signin(username: string, password: string): Promise<any>;
    steamTicket(ticket: string, useNativeAuth?: boolean): Promise<any>;
    me(): MeResponse;
    queryToken(token: string);
  }

  interface Servers {
    list(): Promise<any>;
  }

  interface Register {
    checkMail(email:string):Promise<any>
  }

  interface Raw {
    version(): Promise<{
      ok: number;
      package?: number; // mmo
      packageVersion?: number; // PS
      protocol: number;
      serverData: {
        historyChunkSize: number;
        shards: string[];
      };
      users: string;
    }>;
    authmod(): Promise<
      | { name: "official" }
      | {
          ok: number;
          name: string;
          version: string;
          allowRegistration: boolean;
          steam: boolean;
          github: boolean;
        }
    >;
    history(room: string, tick: number, shard: string): Promise<any>;
    servers: Servers;
    auth: Auth;
    register: Register;
    user: User;
    game: Game;
  }

  interface Socket {
    subscribe():Promise<any>
  }

  interface Api {
    raw: Raw;
    me(): MeResponse;
    socket: Socket
  }

  namespace ScreepsAPI {
    export function auth(
      username: string,
      password: string,
      options?: {
        protocol: "http" | "https";
        hostname: string;
        port: number;
        path: string;
      }
    ): Promise<{ ok: boolean; token: string }>;
    export function fromConfig(
      server: string,
      config?: string,
      opts?: any
    ): Promise<Api>;
  }
}
